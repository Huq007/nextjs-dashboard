"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBrandTabler,
  IconPackage,
  IconShoppingCart,
  IconBuildingWarehouse,
  IconTruck,
  IconUsers,
  IconClipboardList,
  IconReceipt,
  IconChartBar,
  IconReportAnalytics,
  IconAlertCircle,
  IconSettings,
  IconArrowLeft,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const links = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: IconBrandTabler,
    color: "text-blue-500",
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: IconPackage,
    color: "text-emerald-500",
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: IconShoppingCart,
    color: "text-violet-500",
  },
  {
    label: "Warehouses",
    href: "/dashboard/warehouses",
    icon: IconBuildingWarehouse,
    color: "text-amber-500",
  },
  {
    label: "Suppliers",
    href: "/dashboard/suppliers",
    icon: IconTruck,
    color: "text-rose-500",
  },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: IconUsers,
    color: "text-cyan-500",
  },
  {
    label: "Purchase Orders",
    href: "/dashboard/purchase-orders",
    icon: IconClipboardList,
    color: "text-indigo-500",
  },
  {
    label: "Invoices",
    href: "/dashboard/invoices",
    icon: IconReceipt,
    color: "text-teal-500",
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: IconChartBar,
    color: "text-purple-500",
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: IconReportAnalytics,
    color: "text-orange-500",
  },
  {
    label: "Alerts",
    href: "/dashboard/alerts",
    icon: IconAlertCircle,
    color: "text-red-500",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: IconSettings,
    color: "text-gray-500",
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 border-r bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-col gap-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              )}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-400 dark:group-hover:bg-neutral-700"
                )}
              >
                <Icon className={cn("h-5 w-5", link.color)} />
              </motion.button>
              <span className="relative">
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue-600 dark:bg-blue-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </span>
            </Link>
          );
        })}
        <Link
          href="/login"
          className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-400 dark:hover:bg-neutral-700"
          >
            <IconArrowLeft className="h-5 w-5" />
          </motion.button>
          Logout
        </Link>
      </div>
    </nav>
  );
}
