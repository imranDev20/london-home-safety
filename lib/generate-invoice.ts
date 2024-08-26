import prisma from "@/lib/prisma";

  
export async function generateInvoiceId() {
    const mostRecentOrder = await prisma.order.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

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
  
 