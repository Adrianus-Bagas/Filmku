import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

import QueryProviders from "./react-query-provider";

import { Topbar, Bottombar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Filmku",
  description: "Explore Your Movies",
};

export default function RootLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProviders>
          <div className="container">
            <Topbar />
            {children}
            <Bottombar />
          </div>
        </QueryProviders>
      </body>
    </html>
  );
}
