"use client";

import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-14 items-center border-b px-4">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-md p-2 hover:bg-accent"
        >
          {theme === "dark" ? (
            <IconSun className="h-5 w-5" />
          ) : (
            <IconMoon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
} 