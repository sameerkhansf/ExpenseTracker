"use client";

import Link from "next/link";
import { FaChartLine, FaWallet, FaLock, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-5 bg-transparent border-b border-gray-200 dark:border-gray-800">
        <nav className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-3xl font-bold text-gray-900 dark:text-gray-100"
            >
              ExpenseTracker
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/auth/login"
                className="hover:text-gray-600 dark:hover:text-gray-300 text-lg"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 px-6 py-2 rounded-full shadow hover:shadow-md transition-transform transform hover:scale-105"
              >
                Sign up
              </Link>
            </div>
            <button
              className="md:hidden text-gray-900 dark:text-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="mt-4 flex flex-col space-y-4 md:hidden">
              <Link
                href="/auth/login"
                className="hover:text-gray-600 dark:hover:text-gray-300 text-lg"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 px-6 py-2 rounded-full shadow hover:shadow-md transition-transform transform hover:scale-105 text-center"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400"
            >
              Simplify Your Finances, One Click at a Time
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              Experience a seamless way to track expenses, set budgets, and
              achieve financial freedom with just a few clicks.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center space-x-4"
            >
              <Link
                href="/auth/signup"
                className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="#features"
                className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-3 px-8 rounded-full hover:shadow-md transition-transform transform hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Features Designed for You
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FaChartLine className="text-4xl text-blue-500" />}
                title="Expense Tracking"
                description="Track and categorize your expenses to stay on top of your finances."
              />
              <FeatureCard
                icon={<FaWallet className="text-4xl text-teal-500" />}
                title="Budget Management"
                description="Create custom budgets and monitor your spending effortlessly."
              />
              <FeatureCard
                icon={<FaLock className="text-4xl text-blue-400" />}
                title="Secure & Private"
                description="Your data is encrypted and stored securely for peace of mind."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Ready to Take Charge?
            </h2>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
              Thousands of users are achieving financial freedom with
              ExpenseTracker. Join them today.
            </p>
            <Link
              href="/auth/signup"
              className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                ExpenseTracker
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Simplifying personal finance for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Features
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li className="hover:text-blue-400">Expense Tracking</li>
                <li className="hover:text-blue-400">Budget Management</li>
                <li className="hover:text-blue-400">Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Company
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li className="hover:text-blue-400">About Us</li>
                <li className="hover:text-blue-400">Careers</li>
                <li className="hover:text-blue-400">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Legal
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li className="hover:text-blue-400">Privacy Policy</li>
                <li className="hover:text-blue-400">Terms of Service</li>
                <li className="hover:text-blue-400">Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 ExpenseTracker. All rights reserved.
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
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex justify-center mb-4 text-blue-500 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center">
        {description}
      </p>
    </motion.div>
  );
}
