// blogs/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs | K I R T A N',
  description: 'Thoughts, tutorials, and insights about web development, technology, and creative coding.',
  keywords: ['web development', 'programming', 'tutorials', 'technology', 'coding'],
  openGraph: {
    title: 'Blogs | K I R T A N',
    description: 'Thoughts, tutorials, and insights about web development, technology, and creative coding.',
    type: 'website',
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
