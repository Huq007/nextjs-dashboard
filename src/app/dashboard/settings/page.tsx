"use client";

import {
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { useTheme } from "../../providers";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your application preferences
        </p>
      </div>

      {/* Theme Settings */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Appearance
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize how the application looks
        </p>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                Theme
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose between light and dark mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
            >
              {theme === "light" ? (
                <>
                  <IconSun className="mr-2 h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <IconMoon className="mr-2 h-4 w-4" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Additional Settings Sections */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Notifications
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your notification preferences
        </p>
        {/* Add notification settings here */}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Account
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings
        </p>
        {/* Add account settings here */}
      </div>
    </div>
  );
} 