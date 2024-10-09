# Expense Tracker

A modern expense tracking application built with Next.js, React, and TypeScript.

## Features

- User authentication with NextAuth
- Dashboard for expense overview
- Add, edit, and delete expenses
- Expense categorization
- Data visualization with charts
- Dark mode support
- Responsive design

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- Framer Motion
- MongoDB (via Mongoose)
- NextAuth for authentication

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/expense-tracker-next.git
   cd expense-tracker-next
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `src/components`: React components
- `src/pages`: Next.js pages and API routes
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions
- `src/context`: React context providers
- `src/styles`: Global styles and Tailwind CSS configuration

## Available Scripts

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode
- `npm run lint`: Lints the codebase

## Deployment

This project is ready to be deployed on Vercel. For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
