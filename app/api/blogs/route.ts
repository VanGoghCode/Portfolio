// app/api/blogs/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
}

const blogsDirectory = path.join(process.cwd(), 'app/blogs/contents');

export async function GET() {
  try {
    if (!fs.existsSync(blogsDirectory)) {
      return NextResponse.json([]);
    }
    
    const fileNames = fs.readdirSync(blogsDirectory);
    const blogs = fileNames
      .filter(name => name.endsWith('.md') && name !== 'README.md')
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug,
          ...(data as BlogMetadata)
        };
      });
    
    // Sort blogs by date (newest first)
    blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return NextResponse.json([], { status: 500 });
  }
}
