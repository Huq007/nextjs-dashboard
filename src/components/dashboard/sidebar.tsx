"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  IconLayoutDashboard,
  IconPackage,
  IconShoppingCart,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: IconPackage,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: IconShoppingCart,
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: IconUsers,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: IconSettings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span>Dashboard</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 