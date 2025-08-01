import "@mantine/core/styles.css";
import { LoadoutProvider } from "@/app/loadout/context/LoadoutContext";
import RootShell from "@/app/RootShell";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Monster Hunter Wilds Set Builder",
  description: "Search every armor set, instantly",
};

export default function RootLayout({
  children,
  loadout,
}: Readonly<{
  children: React.ReactNode;
  loadout: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider defaultColorScheme="dark">
          <LoadoutProvider>
            <RootShell>
              {children}
              {loadout}
            </RootShell>
          </LoadoutProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
