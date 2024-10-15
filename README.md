# London Home Safety

London Home Safety is a comprehensive web application designed to provide safety services for residential and commercial properties in London. This project is built using Next.js, React, and Prisma, offering a robust and scalable solution for managing safety inspections, certifications, and related services.

## Features

- **Service Categories**: Fire, Gas, Electrical, and Health & Safety services
- **Booking System**: Easy-to-use interface for customers to book services
- **Admin Dashboard**: Comprehensive dashboard for managing orders, users, and services
- **Responsive Design**: Fully responsive layout for optimal viewing on all devices
- **Data Visualization**: Charts and graphs for business insights
- **Email Notifications**: Automated emails for order confirmations and updates
- **Invoice Generation**: PDF invoice generation for completed orders

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Excel Export**: ExcelJS
- **Email**: Custom email sending solution

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables (see `.env.example`)
4. Run the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/app`: Next.js app router and page components
- `/components`: Reusable React components
- `/lib`: Utility functions and shared logic
- `/prisma`: Database schema and migrations
- `/public`: Static assets
- `/styles`: Global styles and Tailwind config

## Key Components

- `ServiceCategories`: Displays available service categories
- `BookNow`: Allows users to initiate the booking process
- `AdminDashboard`: Provides an overview of business operations
- `OrderManagement`: Handles order creation, viewing, and updates

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc.
