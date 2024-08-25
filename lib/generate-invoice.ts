import prisma from "@/lib/prisma";

  
    

  
// export async function generateInvoiceId() {
//     // Fetch the most recent order based on the createdAt timestamp
//     const mostRecentOrder = await prisma.order.findFirst({
//       orderBy: {
//         createdAt: 'desc',  // Sort by createdAt in descending order
//       },
//     });
  
//     let nextInvoiceId;
//     if (mostRecentOrder) {
//       // Extract the numeric part of the invoice ID
//       const numericPart = parseInt(mostRecentOrder.invoiceId.slice(3, -1), 10);
//       // Extract the alphabet part of the invoice ID
//       const alphabetPart = mostRecentOrder.invoiceId.slice(-1);
  
//       let nextNumericPart = numericPart + 1;
  
//       // Handle overflow of the numeric part
//       if (nextNumericPart > 99999) {
//         nextNumericPart = 1;
//         // Move to the next letter in the alphabet
//         const nextAlphabetPart = String.fromCharCode(alphabetPart.charCodeAt(0) + 1);
//         if (nextAlphabetPart > 'Z') {
//           throw new Error('Reached the maximum invoice ID');
//         }
//         nextInvoiceId = `INV${'00001'.slice(0, -nextNumericPart.toString().length) + nextNumericPart}${nextAlphabetPart}`;
//       } else {
//         nextInvoiceId = `INV${'00000'.slice(0, -nextNumericPart.toString().length) + nextNumericPart}${alphabetPart}`;
//       }
//     } else {
//       // If no orders exist, start with the first invoice ID
//       nextInvoiceId = 'INV00001A';
//     }
  
//     return nextInvoiceId;
//   }
  
export async function generateInvoiceId() {
    const mostRecentOrder = await prisma.order.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`mostRecentOrder`, mostRecentOrder);
  
    if (!mostRecentOrder || !mostRecentOrder.invoiceId) {
      return 'INV00001A';
    }
  
    const match = mostRecentOrder.invoiceId.match(/INV(\d{5})([A-Z])/);
    if (!match) {
      console.error('Invalid invoice ID format:', mostRecentOrder.invoiceId);
      return 'INV00001A';
    }
  
    let [, numericPart, alphabetPart] = match;
    let nextNumericPart = parseInt(numericPart, 10) + 1;
  
    if (nextNumericPart > 99999) {
      nextNumericPart = 1;
      alphabetPart = String.fromCharCode(alphabetPart.charCodeAt(0) + 1);
      if (alphabetPart > 'Z') {
        throw new Error('Reached the maximum invoice ID');
      }
    }
  
    const paddedNumericPart = nextNumericPart.toString().padStart(5, '0');
    return `INV${paddedNumericPart}${alphabetPart}`;
  }
  
 