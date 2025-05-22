"use client";

import { motion } from "motion/react";
import {
  IconSettings,
  IconUserCircle,
  IconBuilding,
  IconBellRinging,
  IconLock,
} from "@tabler/icons-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage application settings and configurations
          </p>
        </div>
        {/* Add a Save Settings button or similar if needed */}
      </div>

      {/* Settings Sections (Placeholders) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
          <div className="flex items-center space-x-3">
            <IconUserCircle className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Manage your user profile information.</p>
          {/* Add form elements for profile settings */}
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
           <div className="flex items-center space-x-3">
             <IconBuilding className="h-6 w-6 text-gray-500 dark:text-gray-400" />
             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Company Information</h2>
           </div>
           <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Update your company details.</p>
           {/* Add form elements for company info */}
         </div>

         <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
            <div className="flex items-center space-x-3">
              <IconBellRinging className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h2>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Configure your notification preferences.</p>
            {/* Add form elements for notifications */}
          </div>

           <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
             <div className="flex items-center space-x-3">
               <IconLock className="h-6 w-6 text-gray-500 dark:text-gray-400" />
               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h2>
             </div>
             <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Adjust your account security settings.</p>
             {/* Add form elements for security */}
           </div>
      </div>
    </div>
  );
} 