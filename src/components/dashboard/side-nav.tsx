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

const links = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: IconBrandTabler,
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: IconPackage,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: IconShoppingCart,
  },
  {
    label: "Warehouses",
    href: "/dashboard/warehouses",
    icon: IconBuildingWarehouse,
  },
  {
    label: "Suppliers",
    href: "/dashboard/suppliers",
    icon: IconTruck,
  },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: IconUsers,
  },
  {
    label: "Purchase Orders",
    href: "/dashboard/purchase-orders",
    icon: IconClipboardList,
  },
  {
    label: "Invoices",
    href: "/dashboard/invoices",
    icon: IconReceipt,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: IconChartBar,
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: IconReportAnalytics,
  },
  {
    label: "Alerts",
    href: "/dashboard/alerts",
    icon: IconAlertCircle,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: IconSettings,
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 border-r bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/login"
          className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <IconArrowLeft className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </nav>
  );
} 