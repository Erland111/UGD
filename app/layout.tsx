import './globals.css';
import { ReactNode } from 'react';
import { Creepster } from 'next/font/google';

const creepster = Creepster({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-zinc-900 text-white ${creepster.className}`}>
        {children}
      </body>
    </html>
  );
}
