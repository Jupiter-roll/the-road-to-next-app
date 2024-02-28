import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';

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
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main
          className="
            min-h-screen
            bg-gradient-to-b from-slate-900 to-emerald-600
            flex flex-col items-center
            py-32
          "
        >
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
