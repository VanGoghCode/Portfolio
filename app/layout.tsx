// layout.tsx

import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'K',
  description: 'Building digital worlds where code meets creativity, no compromises',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}