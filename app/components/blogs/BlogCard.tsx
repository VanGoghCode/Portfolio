// components/blogs/BlogCard.tsx

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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
  blog: BlogPost;
  darkMode: boolean;
};

const BlogCard: React.FC<Props> = ({ blog, darkMode }) => {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <article 
        className={`
          h-full p-6 rounded-lg border transition-all duration-300 
          hover:shadow-lg hover:scale-105 cursor-pointer
          backdrop-blur-sm
        `}
        style={{
          backgroundColor: darkMode 
            ? 'rgba(var(--color-primary), 0.1)' 
            : 'rgba(var(--color-background), 0.8)',
          borderColor: darkMode 
            ? 'var(--color-primary)' 
            : 'var(--color-secondary)'
        }}
      >
        {/* Featured Image (if available) */}
        {blog.image && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <Image 
              src={blog.image} 
              alt={blog.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs rounded-full border"
              style={{
                backgroundColor: darkMode 
                  ? 'var(--color-primary)' 
                  : 'var(--color-secondary)',
                color: 'var(--color-text-light)',
                borderColor: darkMode 
                  ? 'var(--color-primary)' 
                  : 'var(--color-secondary)'
              }}
            >
              {tag}
            </span>
          ))}
          {blog.tags.length > 2 && (
            <span 
              className="px-2 py-1 text-xs rounded-full border"
              style={{
                backgroundColor: 'transparent',
                color: darkMode 
                  ? 'var(--color-text-light)' 
                  : 'var(--color-text-secondary)',
                borderColor: darkMode 
                  ? 'var(--color-primary)' 
                  : 'var(--color-secondary)'
              }}
            >
              +{blog.tags.length - 2}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-bold mb-3 overflow-hidden"
          style={{ 
            color: darkMode 
              ? 'var(--color-text-light)' 
              : 'var(--color-text-primary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p 
          className="text-sm mb-4 overflow-hidden"
          style={{ 
            color: darkMode 
              ? 'var(--color-text-light)' 
              : 'var(--color-text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {blog.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex flex-col gap-1">
            <span 
              style={{ 
                color: darkMode 
                  ? 'var(--color-text-light)' 
                  : 'var(--color-text-secondary)' 
              }}
            >
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span 
              style={{ 
                color: darkMode 
                  ? 'var(--color-accent)' 
                  : 'var(--color-primary)' 
              }}
            >
              By {blog.author}
            </span>
          </div>
          <span 
            style={{ 
              color: darkMode 
                ? 'var(--color-accent)' 
                : 'var(--color-primary)' 
            }}
          >
            {blog.readTime}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
