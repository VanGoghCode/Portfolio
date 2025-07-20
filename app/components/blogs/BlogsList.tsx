// components/blogs/BlogsList.tsx

"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import GoldenLetters from "../../common/styling/goldenLetters";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  author: string;
};

type Props = {
  darkMode: boolean;
};

const BlogsList: React.FC<Props> = ({ darkMode }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const blogData = await response.json();
        setBlogs(blogData);
      } catch (error) {
        console.error('Error loading blogs:', error);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-error)' }}>
          {error}
        </h1>
        <p className="text-gray-600 mb-8">
          Unable to load blog posts. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <GoldenLetters text="My Blogs" />
        </h1>
        <p 
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ 
            color: darkMode 
              ? 'var(--color-text-light)' 
              : 'var(--color-text-primary)' 
          }}
        >
          Thoughts, tutorials, and insights about web development, technology, and creative coding.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} darkMode={darkMode} />
        ))}
      </div>

      {/* Empty State Message (when no blogs) */}
      {blogs.length === 0 && !loading && (
        <div className="text-center py-16">
          <p 
            className="text-lg"
            style={{ 
              color: darkMode 
                ? 'var(--color-text-light)' 
                : 'var(--color-text-primary)' 
            }}
          >
            No blogs available yet. Check back soon for new content!
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogsList;
