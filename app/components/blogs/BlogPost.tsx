// components/blogs/BlogPost.tsx

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost as BlogPostType } from "./BlogCard";
import GoldenLetters from "../../common/styling/goldenLetters";
import WhiteLetters from "../../common/styling/whiteLetters";
import FlipText from "../../common/styling/flipText";

type Props = {
  slug: string;
  darkMode: boolean;
};

interface FullBlogPost extends BlogPostType {
  content: string;
  htmlContent: string;
}

const BlogPost: React.FC<Props> = ({ slug, darkMode }) => {
  const [blog, setBlog] = useState<FullBlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        
        // Fetch blog data
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog post not found');
          } else {
            setError('Failed to load blog post');
          }
          return;
        }
        
        const blogData = await response.json();
        setBlog(blogData);
        
        // Fetch related blogs
        const relatedResponse = await fetch(`/api/blogs/${slug}/related?tags=${blogData.tags.join(',')}&limit=3`);
        if (relatedResponse.ok) {
          const related = await relatedResponse.json();
          setRelatedBlogs(related);
        }
        
      } catch (err) {
        console.error('Error loading blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  // Add copy functionality for code blocks
  useEffect(() => {
    const handleCopyCode = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('copy-code-btn')) {
        const encodedCode = target.getAttribute('data-code');
        
        if (encodedCode) {
          const code = decodeURIComponent(encodedCode);
          navigator.clipboard.writeText(code).then(() => {
            // Visual feedback
            const originalText = target.innerHTML;
            target.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              Copied!
            `;
            target.classList.add('copied');
            
            setTimeout(() => {
              target.innerHTML = originalText;
              target.classList.remove('copied');
            }, 2000);
          }).catch(err => {
            console.error('Failed to copy code:', err);
          });
        }
      }
    };

    document.addEventListener('click', handleCopyCode);
    return () => document.removeEventListener('click', handleCopyCode);
  }, [blog]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-error)' }}>
          {error || 'Blog not found'}
        </h1>
        <p className="text-gray-600 mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.
        </p>
        <Link 
          href="/blogs"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Back to Blogs Link */}
      <Link 
        href="/blogs"
        className="inline-flex items-center gap-2 mb-8 text-accent hover:text-secondary transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        <FlipText text="Back to Blogs" />
      </Link>

      {/* Blog Header */}
      <header className="mb-8">
        {/* Featured Image */}
        {blog.image && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <Image 
              src={blog.image} 
              alt={blog.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 text-sm rounded-full border"
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
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <GoldenLetters text={blog.title} />
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
          <span 
            style={{ 
              color: darkMode 
                ? 'var(--color-text-light)' 
                : 'var(--color-text-secondary)' 
            }}
          >
            By <WhiteLetters text={blog.author} />
          </span>
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
            {blog.readTime}
          </span>
        </div>

        {/* Excerpt */}
        <p 
          className="text-lg md:text-xl leading-relaxed"
          style={{ 
            color: darkMode 
              ? 'var(--color-text-light)' 
              : 'var(--color-text-secondary)' 
          }}
        >
          {blog.excerpt}
        </p>
      </header>

      {/* Blog Content */}
      <article 
        className="blog-content prose prose-lg max-w-none"
        style={{ 
          color: darkMode 
            ? 'var(--color-text-light)' 
            : 'var(--color-text-primary)' 
        }}
        dangerouslySetInnerHTML={{ __html: blog.htmlContent }}
      />

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-300">
          <h2 className="text-2xl font-bold mb-8">
            <WhiteLetters text="Related Articles" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogs.map((relatedBlog) => (
              <Link 
                key={relatedBlog.slug}
                href={`/blogs/${relatedBlog.slug}`}
                className="block p-4 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  backgroundColor: darkMode 
                    ? 'rgba(var(--color-primary), 0.1)' 
                    : 'rgba(var(--color-background), 0.8)',
                  borderColor: darkMode 
                    ? 'var(--color-primary)' 
                    : 'var(--color-secondary)'
                }}
              >
                <h3 
                  className="font-bold mb-2"
                  style={{ 
                    color: darkMode 
                      ? 'var(--color-text-light)' 
                      : 'var(--color-text-primary)' 
                  }}
                >
                  {relatedBlog.title}
                </h3>
                <p 
                  className="text-sm text-gray-600 mb-2"
                  style={{ 
                    color: darkMode 
                      ? 'var(--color-text-light)' 
                      : 'var(--color-text-secondary)' 
                  }}
                >
                  {relatedBlog.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span 
                    style={{ 
                      color: darkMode 
                        ? 'var(--color-text-light)' 
                        : 'var(--color-text-secondary)' 
                    }}
                  >
                    {new Date(relatedBlog.date).toLocaleDateString()}
                  </span>
                  <span 
                    style={{ 
                      color: darkMode 
                        ? 'var(--color-accent)' 
                        : 'var(--color-primary)' 
                    }}
                  >
                    {relatedBlog.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
