"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaDollarSign,
  FaLanguage,
  FaCog,
  FaArrowLeft,
  FaCamera,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

export default function Profile() {
  const { data: session, update } = useSession();
  const { state } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(
    session?.user?.image || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session) {
      setIsLoading(false);
      setProfileImage(session.user?.image || null);
    }
  }, [session]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/api/upload-profile-image", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const { imageUrl } = await response.json();
          setProfileImage(imageUrl);
          await update({
            ...session,
            user: { ...session?.user, image: imageUrl },
          });
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center mb-8 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">User Profile</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 bg-gray-100 dark:bg-gray-700 p-6 flex items-center justify-center">
                <FaUser size={80} className="text-gray-400" />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
                  Account Details
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {session?.user?.name || "N/A"}
                </h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileItem
                    icon={FaEnvelope}
                    label="Email"
                    value={session?.user?.email || "N/A"}
                  />
                  <ProfileItem
                    icon={FaCalendar}
                    label="Member since"
                    value="January 1, 2023"
                  />
                  <ProfileItem
                    icon={FaDollarSign}
                    label="Currency"
                    value={state.currency}
                  />
                  <ProfileItem
                    icon={FaLanguage}
                    label="Language"
                    value={state.language}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    className="inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaCamera className="mr-2" /> Upload Profile Image
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-4 bg-gray-50 dark:bg-gray-800">
              <Link
                href="/settings"
                className="inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
              >
                <FaCog className="mr-2" /> Edit Profile Settings
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface ProfileItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex items-center">
    <Icon className="text-gray-400 mr-2" />
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);
