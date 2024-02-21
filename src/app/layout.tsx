import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/navigation';
import { getAuth } from '@/features/auth/queries/get-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Road to Next',
  description: 'My Road to Next application ...',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-emerald-900 py-8">
          <Navigation user={user} />

          <div className="flex-1 pt-8 flex">{children}</div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
