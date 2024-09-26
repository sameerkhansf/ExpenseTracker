"use client";

import Link from "next/link";
import { FaChartLine, FaWallet, FaLock } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <header className="p-5 bg-white dark:bg-gray-800 shadow-sm">
        <nav className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            ExpenseTracker
          </Link>
          <div className="space-x-4">
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-extrabold mb-6 text-gray-800 dark:text-white">
              Take Control of Your Finances
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Our Expense Tracker Application helps you manage your finances,
              set budgets, and achieve your financial goals with ease and
              precision.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/auth/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md transition duration-300"
              >
                Get Started for Free
              </Link>
              <Link
                href="#features"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 border border-gray-300 rounded-md shadow-sm transition duration-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FaChartLine className="text-4xl text-blue-500" />}
                title="Expense Tracking"
                description="Easily log and categorize your expenses to get a clear picture of your spending habits."
              />
              <FeatureCard
                icon={<FaWallet className="text-4xl text-blue-500" />}
                title="Budget Management"
                description="Set and manage budgets for different categories to keep your finances on track."
              />
              <FeatureCard
                icon={<FaLock className="text-4xl text-blue-500" />}
                title="Secure & Private"
                description="Your financial data is encrypted and securely stored, ensuring your privacy."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-blue-50 dark:bg-blue-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Ready to Take Control?
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Join thousands of users who have already improved their financial
              health with ExpenseTracker.
            </p>
            <Link
              href="/auth/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md transition duration-300"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                ExpenseTracker
              </h3>
              <p className="text-sm text-gray-400">
                Simplifying personal finance management for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">
                Features
              </h4>
              <ul className="text-sm text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    Expense Tracking
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    Budget Management
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    Reports & Analytics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">
                Company
              </h4>
              <ul className="text-sm text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">
                Legal
              </h4>
              <ul className="text-sm text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © 2023 ExpenseTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
