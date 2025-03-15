
import './globals.css';

export const metadata = {
  title: 'My Portfolio',
  description: 'A cool portfolio built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='light'>{children}</body>
    </html>
  );
}
