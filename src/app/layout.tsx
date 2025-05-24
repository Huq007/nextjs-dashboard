import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "A modern inventory management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-montserrat">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
