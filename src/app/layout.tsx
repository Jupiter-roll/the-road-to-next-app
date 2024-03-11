import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { RedirectToast } from '@/components/redirect-toast';
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
          <main
            className="
              min-h-screen flex-1
              overflow-y-auto overflow-x-hidden
              py-24 px-8
              bg-secondary/10
              flex flex-col
            "
          >
            {children}
          </main>
          <Toaster />
          {/* <RedirectToast key={new Date().getTime()} /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
