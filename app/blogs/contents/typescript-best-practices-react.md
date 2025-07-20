---
title: "TypeScript Best Practices for React"
date: "2025-01-10"
excerpt: "Discover essential TypeScript patterns and best practices for building robust React applications with better type safety."
tags: ["TypeScript", "React", "Best Practices"]
readTime: "8 min read"
image: "/media/png/typescript-react.png"
author: "Kirtankumar Thummar"
---

# TypeScript Best Practices for React

TypeScript has become an essential tool for React developers, providing type safety and better developer experience. Here are some best practices to make the most of TypeScript in your React projects.

## 1. Component Props Typing

Always define clear interfaces for your component props:

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};
```

## 2. State Typing

Use generic types for useState when TypeScript can't infer the type:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
const [users, setUsers] = useState<User[]>([]);
```

## 3. Event Handlers

Type your event handlers properly:

```typescript
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(event.target.value);
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission
};
```

## 4. Custom Hooks

Create strongly typed custom hooks:

```typescript
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

## 5. Advanced Patterns

### Discriminated Unions

Use discriminated unions for complex state:

```typescript
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

const [state, setState] = useState<LoadingState>({ status: 'idle' });
```

### Generic Components

Create reusable generic components:

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

## 6. Utility Types

Leverage TypeScript's utility types:

```typescript
// Pick specific properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit properties
type CreateUser = Omit<User, 'id'>;

// Partial for optional updates
type UpdateUser = Partial<User>;

// Record for key-value pairs
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
```

## 7. Context API with TypeScript

Type your context properly:

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

## Common Pitfalls to Avoid

1. **Don't use `any`** - Use `unknown` instead when needed
2. **Avoid `React.FC`** - Use direct function declarations
3. **Don't over-type** - Let TypeScript infer when possible
4. **Use strict mode** - Enable strict TypeScript settings

## Conclusion

TypeScript transforms React development by catching errors early and providing excellent IDE support. Following these best practices will help you build more maintainable and robust React applications.

Remember: TypeScript is not just about adding types—it's about improving your development workflow and code quality!
