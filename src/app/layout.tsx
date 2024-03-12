import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { AuthenticatedSidebar } from '@/components/sidebar/components/authenticated-sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Road to Next',
  description: 'My Road to Next application ...',
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
          <Header />
          <div className="flex h-screen overflow-hidden border-collapse">
            <AuthenticatedSidebar />
            <main className="flex flex-col flex-1 min-h-screen px-8 py-24 overflow-x-hidden overflow-y-auto bg-secondary/10">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
