"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaSun,
  FaMoon,
  FaBell,
  FaLock,
  FaLanguage,
  FaDollarSign,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { DefaultUser, Session } from "next-auth";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

type ExtendedUser = {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  language?: string;
} & DefaultUser;

// Update your session type
interface ExtendedSession extends Session {
  user: ExtendedUser;
}

const SettingSection = memo(
  ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      {children}
    </motion.div>
  )
);

SettingSection.displayName = "SettingSection";

const currencyOptions = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  // Add more currencies as needed
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { data: session, update } = useSession() as {
    data: ExtendedSession | null;
    update: any;
  };
  const [mounted, setMounted] = useState(false);
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  // Combine all settings into a single state object
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    language: "English",
    currency: "USD",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setMounted(true);
    if (session?.user) {
      setSettings({
        emailNotifications: (session.user as any).emailNotifications ?? true,
        pushNotifications: (session.user as any).pushNotifications ?? true,
        language: (session.user as any).language ?? "English",
        currency: (session.user as any).currency ?? "USD",
      });
    }
  }, [session?.user]);

  const handleSettingChange = useCallback(
    (key: string, value: any) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      if (key === "language") {
        dispatch({ type: "SET_LANGUAGE", payload: value });
      } else if (key === "currency") {
        dispatch({ type: "SET_CURRENCY", payload: value });
      }
    },
    [dispatch]
  );

  const handlePasswordChange = useCallback((key: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [key]: value }));
  }, []);

  const saveSettings = useCallback(async () => {
    try {
      const response = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        // Update the session
        await update({
          ...session,
          user: {
            ...session?.user,
            ...settings,
          },
        });

        // Force a session refresh
        await fetch("/api/auth/session?update");

        alert("Settings saved successfully");

        // Use router.push to navigate back to the dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  }, [settings, session, update, router]);

  const changePassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setPasswordError("");

      if (passwords.newPassword !== passwords.confirmPassword) {
        setPasswordError("New passwords do not match");
        return;
      }

      try {
        const response = await fetch("/api/user/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
          }),
        });

        if (response.ok) {
          setPasswords({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          alert("Password changed successfully");
        } else {
          const data = await response.json();
          setPasswordError(data.message || "Failed to change password");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        setPasswordError("An error occurred. Please try again.");
      }
    },
    [passwords]
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="flex items-center mb-8 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <SettingSection
          title="Appearance"
          icon={<FaSun className="text-yellow-500" size={24} />}
        >
          <div className="flex items-center space-x-4">
            {mounted && (
              <>
                <button
                  onClick={() => setTheme("light")}
                  className={`p-3 rounded-full transition-colors ${
                    theme === "light"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <FaSun size={20} />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-3 rounded-full transition-colors ${
                    theme === "dark"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <FaMoon size={20} />
                </button>
              </>
            )}
          </div>
        </SettingSection>

        <SettingSection
          title="Notifications"
          icon={<FaBell className="text-green-500" size={24} />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    handleSettingChange("emailNotifications", e.target.checked)
                  }
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) =>
                    handleSettingChange("pushNotifications", e.target.checked)
                  }
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </SettingSection>

        <SettingSection
          title="Security"
          icon={<FaLock className="text-red-500" size={24} />}
        >
          <form onSubmit={changePassword} className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              value={passwords.oldPassword}
              onChange={(e) =>
                handlePasswordChange("oldPassword", e.target.value)
              }
              className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Change Password
            </button>
          </form>
        </SettingSection>

        <SettingSection
          title="Language"
          icon={<FaLanguage className="text-purple-500" size={24} />}
        >
          <select
            className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"
            value={settings.language}
            onChange={(e) => handleSettingChange("language", e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </SettingSection>

        <SettingSection
          title="Currency"
          icon={<FaDollarSign className="text-green-500" size={24} />}
        >
          <select
            className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded"
            value={settings.currency}
            onChange={(e) => handleSettingChange("currency", e.target.value)}
          >
            {currencyOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name} ({option.symbol})
              </option>
            ))}
          </select>
        </SettingSection>

        <motion.button
          onClick={saveSettings}
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Settings
        </motion.button>
      </div>
    </div>
  );
}
