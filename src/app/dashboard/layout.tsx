"use client";

import { TopNav } from "@/components/dashboard/top-nav";
import { SideNav } from "@/components/dashboard/side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-neutral-900">
          {children}
        </main>
      </div>
    </div>
  );
} 