// app/api/blogs/[slug]/related/route.ts

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const { searchParams } = new URL(request.url);
    const currentTags = searchParams.get('tags')?.split(',') || [];
    const limit = parseInt(searchParams.get('limit') || '3');
    
    if (!fs.existsSync(blogsDirectory)) {
      return NextResponse.json([]);
    }
    
    const fileNames = fs.readdirSync(blogsDirectory);
    const allBlogs = fileNames
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
      })
      .filter(blog => blog.slug !== resolvedParams.slug); // Exclude current blog
    
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
    
    const relatedBlogs = scoredBlogs
      .slice(0, limit)
      .map(blog => ({
        slug: blog.slug,
        title: blog.title,
        date: blog.date,
        excerpt: blog.excerpt,
        tags: blog.tags,
        readTime: blog.readTime,
        image: blog.image,
        author: blog.author
      }));
    
    return NextResponse.json(relatedBlogs);
  } catch (error) {
    console.error('Error getting related blogs:', error);
    return NextResponse.json([], { status: 500 });
  }
}
