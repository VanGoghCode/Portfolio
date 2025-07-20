// utils/blogUtils.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogMetadata {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  image?: string;
  author: string;
}

export interface BlogPost extends BlogMetadata {
  slug: string;
  content: string;
  htmlContent: string;
}

const blogsDirectory = path.join(process.cwd(), 'app/blogs/contents');

// Configure marked for better code highlighting
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Custom renderer for code blocks to add copy functionality
const renderer = new marked.Renderer();

renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  const id = Math.random().toString(36).substr(2, 9);
  return `
    <div class="code-block-container" data-language="${lang || 'text'}">
      <div class="code-block-header">
        <span class="code-language">${lang || 'text'}</span>
        <button class="copy-code-btn" data-code-id="${id}" data-code="${encodeURIComponent(text)}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="m5 15-4-4 4-4"></path>
          </svg>
          Copy
        </button>
      </div>
      <pre><code class="language-${lang || 'text'}" id="code-${id}">${text}</code></pre>
    </div>
  `;
};

marked.setOptions({ renderer });

export function getAllBlogSlugs(): string[] {
  try {
    if (!fs.existsSync(blogsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(blogsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

export function getAllBlogs(): Omit<BlogPost, 'content' | 'htmlContent'>[] {
  try {
    const slugs = getAllBlogSlugs();
    const blogs = slugs.map(slug => {
      const fullPath = path.join(blogsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug,
        ...(data as BlogMetadata)
      };
    });
    
    // Sort blogs by date (newest first)
    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const htmlContent = await marked(content);
    
    return {
      slug,
      content,
      htmlContent,
      ...(data as BlogMetadata)
    };
  } catch (error) {
    console.error('Error reading blog:', error);
    return null;
  }
}

export function getRelatedBlogs(currentSlug: string, currentTags: string[], limit: number = 3): Omit<BlogPost, 'content' | 'htmlContent'>[] {
  try {
    const allBlogs = getAllBlogs().filter(blog => blog.slug !== currentSlug);
    
    // Score blogs based on tag similarity
    const scoredBlogs = allBlogs.map(blog => {
      const commonTags = blog.tags.filter(tag => currentTags.includes(tag));
      return {
        ...blog,
        score: commonTags.length
      };
    });
    
    // Sort by score (descending) and then by date (newest first)
    scoredBlogs.sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return scoredBlogs.slice(0, limit).map(({ score, ...blog }) => blog);
  } catch (error) {
    console.error('Error getting related blogs:', error);
    return [];
  }
}
