// app/api/blogs/[slug]/route.ts

import { NextResponse } from 'next/server';
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

export interface FullBlogPost extends BlogMetadata {
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

// Helper function to escape HTML entities
const escapeHtml = (text: string): string => {
  const htmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
};

renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  const id = Math.random().toString(36).substr(2, 9);
  const escapedText = escapeHtml(text);
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
      <pre><code class="language-${lang || 'text'}" id="code-${id}">${escapedText}</code></pre>
    </div>
  `;
};

marked.setOptions({ renderer });

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const htmlContent = await marked(content);
    
    const blog: FullBlogPost = {
      slug,
      content,
      htmlContent,
      ...(data as BlogMetadata)
    };
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error reading blog:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
