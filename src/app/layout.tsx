"use client";
import { useTranslation } from "react-i18next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { ActivityWidget } from "./components";
import I18nProvider from "./i18n-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  return (
    <html lang="en">
      <head>
        <title>{t("layout.title")}</title>
        <meta name="description" content={t("layout.description")} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <NavBar />
          {children}
          <ActivityWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
