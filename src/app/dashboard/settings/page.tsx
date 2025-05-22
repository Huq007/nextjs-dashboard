"use client";

import { motion } from "framer-motion";
import {
  IconSettings,
  IconUserCircle,
  IconBuilding,
  IconBellRinging,
  IconLock,
  IconPalette,
  IconLanguage,
  IconCurrencyDollar,
} from "@tabler/icons-react";

const settingsSections = [
  {
    title: "Profile Settings",
    icon: IconUserCircle,
    description: "Manage your account profile and personal information",
  },
  {
    title: "Company Settings",
    icon: IconBuilding,
    description: "Configure your company details and preferences",
  },
  {
    title: "Notification Settings",
    icon: IconBellRinging,
    description: "Customize your notification preferences",
  },
  {
    title: "Security Settings",
    icon: IconLock,
    description: "Manage your security preferences and password",
  },
  {
    title: "Appearance",
    icon: IconPalette,
    description: "Customize the look and feel of your dashboard",
  },
  {
    title: "Language & Region",
    icon: IconLanguage,
    description: "Set your preferred language and regional settings",
  },
  {
    title: "Currency & Units",
    icon: IconCurrencyDollar,
    description: "Configure currency and measurement units",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800"
            >
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
                >
                  Configure
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Settings */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Additional Settings
        </h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Dark Mode
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle between light and dark theme
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600">
              <span className="sr-only">Toggle dark mode</span>
              <span
                className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark:translate-x-5"
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Email Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive email notifications for important updates
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600">
              <span className="sr-only">Toggle email notifications</span>
              <span
                className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark:translate-x-5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 