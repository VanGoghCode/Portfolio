# Blog File Format Documentation

This document describes the format for creating blog posts in the portfolio website.

## File Location
All blog files should be placed in: `app/blogs/contents/`

## File Format
Blog files should be saved as **Markdown (.md)** files with a specific frontmatter format.

## File Structure

---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief summary of your blog post that appears on the blog list page"
tags: ["Tag1", "Tag2", "Tag3"]
readTime: "X min read"
image: "/path/to/featured/image.png" # Optional
author: "Author Name"
---

### Required Fields
- **title**: The blog post title
- **date**: Publication date in YYYY-MM-DD format
- **excerpt**: Brief description for blog cards and SEO
- **tags**: Array of relevant tags for categorization
- **readTime**: Estimated reading time
- **author**: Author name

### Optional Fields
- **image**: Featured image path (relative to public folder)

## Content Format

After the frontmatter, write your blog content in standard Markdown format.

### Supported Features

#### 1. Headings
```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
```

#### 2. Text Formatting
```markdown
**Bold text**
*Italic text*
`Inline code`
```

#### 3. Code Blocks with Syntax Highlighting
Use fenced code blocks with language specification:

````markdown
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

```typescript
interface User {
  id: number;
  name: string;
}
```

```bash
npm install package-name
```
````

#### 4. Lists
```markdown
- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2
```

#### 5. Links and Images
```markdown
[Link text](https://example.com)
![Alt text](/path/to/image.png)
```

#### 6. Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

## Example Blog File

Here's a complete example of a blog file:

```markdown
---
title: "Getting Started with React Hooks"
date: "2025-01-20"
excerpt: "Learn how to use React Hooks to manage state and side effects in functional components."
tags: ["React", "JavaScript", "Hooks"]
readTime: "7 min read"
image: "/media/png/react-hooks.png"
author: "John Doe"
---

# Getting Started with React Hooks

React Hooks revolutionized how we write React components. In this article, we'll explore the most commonly used hooks.

## What are React Hooks?

Hooks are functions that let you use state and other React features in functional components.

### useState Hook

The `useState` hook lets you add state to functional components:

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Best Practices

1. **Always use hooks at the top level** - Don't call hooks inside loops or conditions
2. **Use multiple state variables** instead of one complex object
3. **Extract custom hooks** for reusable logic

> Remember: Hooks are just JavaScript functions with special behavior!

## Conclusion

React Hooks make functional components more powerful and easier to test. Start using them in your next project!
```

## Features

### Code Copy Functionality
- All code blocks automatically include a copy button
- Users can click to copy code to their clipboard
- Visual feedback shows when code is copied

### Syntax Highlighting
- Automatic syntax highlighting for popular languages
- Supports JavaScript, TypeScript, HTML, CSS, Bash, and more
- Dark theme optimized color scheme

### Related Articles
- Automatically suggests related blog posts based on tags
- Shows up to 3 related articles at the bottom of each post

### Responsive Design
- Optimized for all screen sizes
- Mobile-friendly reading experience
- Dark mode support

## Adding New Blogs

1. Create a new `.md` file in `app/blogs/contents/`
2. Use the filename as the URL slug (e.g., `my-blog-post.md` becomes `/blogs/my-blog-post`)
3. Follow the frontmatter format above
4. Write your content in Markdown
5. The blog will automatically appear on the blogs page

## File Naming Convention

- Use lowercase letters
- Use hyphens instead of spaces
- Be descriptive but concise
- Example: `react-performance-optimization.md`

## Tips for Better Blogs

1. **Use descriptive titles** that clearly indicate the content
2. **Write compelling excerpts** that encourage readers to click
3. **Choose relevant tags** for better discoverability
4. **Include code examples** when applicable
5. **Add images** to make posts more engaging
6. **Keep reading time accurate** for better user experience

---

This format ensures consistency across all blog posts and provides a great reading experience for your portfolio visitors!
