import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/app/_navigation/sidebar/components/sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "./_navigation/header";
import { ReactQueryProvider } from "./_providers/react-query/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "My Road to Next application ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ReactQueryProvider>
            <Header />
            <div className="flex h-screen overflow-hidden border-collapse">
              <Sidebar />
              <main
                className="
                  min-h-screen flex-1
                  overflow-y-auto overflow-x-hidden
                  py-24 px-8
                  bg-secondary/20
                  flex flex-col
                "
              >
                {children}
              </main>
            </div>
            <Toaster expand />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
