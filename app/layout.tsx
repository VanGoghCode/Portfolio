// layout.tsx

import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creative Developer Portfolio',
  description: 'A portfolio showcasing creative web development work',
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