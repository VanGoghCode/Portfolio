---
title: "Advanced React Patterns for Modern Applications"
date: "2025-01-20"
excerpt: "Explore advanced React patterns including compound components, render props, and custom hooks for building scalable applications."
tags: ["React", "JavaScript", "Advanced", "Patterns"]
readTime: "10 min read"
image: "/media/png/react-patterns.png"
author: "Kirtankumar Thummar"
---

# Advanced React Patterns for Modern Applications

As React applications grow in complexity, it becomes crucial to adopt proven patterns that promote reusability, maintainability, and scalability. In this comprehensive guide, we'll explore advanced React patterns that will elevate your development skills.

## Why Advanced Patterns Matter

Modern React development goes beyond simple component creation. Advanced patterns help us:

- **Improve code reusability** across different components
- **Enhance maintainability** of large codebases
- **Provide better APIs** for component consumers
- **Optimize performance** through smart rendering strategies

## 1. Compound Components Pattern

The compound components pattern allows you to create components that work together while maintaining their independence.

### Basic Implementation

```jsx
// TabContext.js
import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab compound components must be used within Tabs');
  }
  return context;
};

// Tabs.jsx
export const Tabs = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const contextValue = {
    activeTab,
    setActiveTab
  };

  return (
    <TabContext.Provider value={contextValue}>
      <div className="tabs-container">
        {children}
      </div>
    </TabContext.Provider>
  );
};

// TabList.jsx
export const TabList = ({ children }) => {
  return (
    <div className="tab-list" role="tablist">
      {children}
    </div>
  );
};

// Tab.jsx
export const Tab = ({ children, index }) => {
  const { activeTab, setActiveTab } = useTabs();
  
  return (
    <button
      className={`tab ${activeTab === index ? 'active' : ''}`}
      onClick={() => setActiveTab(index)}
      role="tab"
    >
      {children}
    </button>
  );
};

// TabPanels.jsx
export const TabPanels = ({ children }) => {
  return <div className="tab-panels">{children}</div>;
};

// TabPanel.jsx
export const TabPanel = ({ children, index }) => {
  const { activeTab } = useTabs();
  
  if (activeTab !== index) return null;
  
  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
};
```

### Usage Example

```jsx
function App() {
  return (
    <Tabs defaultTab={0}>
      <TabList>
        <Tab index={0}>Dashboard</Tab>
        <Tab index={1}>Profile</Tab>
        <Tab index={2}>Settings</Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel index={0}>
          <Dashboard />
        </TabPanel>
        <TabPanel index={1}>
          <Profile />
        </TabPanel>
        <TabPanel index={2}>
          <Settings />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

## 2. Render Props Pattern

Render props is a technique for sharing code between components using a prop whose value is a function.

### Mouse Tracker Example

```jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div 
        style={{ height: '100vh' }} 
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div>
          <h1>Mouse position: ({x}, {y})</h1>
          <Cursor x={x} y={y} />
        </div>
      )}
    />
  );
}
```

### Modern Hook Version

```jsx
import { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

// Usage
function App() {
  const { x, y } = useMousePosition();
  
  return (
    <div>
      <h1>Mouse position: ({x}, {y})</h1>
      <Cursor x={x} y={y} />
    </div>
  );
}
```

## 3. Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new component with additional functionality.

### Authentication HOC

```jsx
const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check authentication status
      checkAuthStatus().then(status => {
        setIsAuthenticated(status);
        setLoading(false);
      });
    }, []);

    if (loading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
      return <LoginForm />;
    }

    return <WrappedComponent {...props} />;
  };
};

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### Logging HOC

```jsx
const withLogging = (WrappedComponent) => {
  return function LoggingComponent(props) {
    useEffect(() => {
      console.log(`${WrappedComponent.name} mounted`);
      return () => {
        console.log(`${WrappedComponent.name} unmounted`);
      };
    }, []);

    const handleClick = (...args) => {
      console.log(`${WrappedComponent.name} clicked`);
      if (props.onClick) {
        props.onClick(...args);
      }
    };

    return <WrappedComponent {...props} onClick={handleClick} />;
  };
};
```

## 4. Custom Hooks Patterns

Custom hooks encapsulate stateful logic that can be reused across components.

### Data Fetching Hook

```jsx
const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Local Storage Hook

```jsx
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
    </div>
  );
}
```

## 5. State Management Patterns

### useReducer for Complex State

```jsx
const initialState = {
  user: null,
  loading: false,
  error: null
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case 'FETCH_USER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

function UserManager() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUser = async (id) => {
    dispatch({ type: 'FETCH_USER_START' });
    try {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div>
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}
      {state.user && (
        <div>
          <h1>Welcome, {state.user.name}!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
```

## Performance Optimization Patterns

### React.memo and useMemo

```jsx
import React, { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => onUpdate(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

function ParentComponent() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const handleUpdate = useCallback((id) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, updated: true } : item
    ));
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <ExpensiveComponent data={data} onUpdate={handleUpdate} />
    </div>
  );
}
```

## Best Practices

1. **Choose the right pattern** for your use case
2. **Start simple** and refactor to patterns when needed
3. **Avoid over-engineering** with unnecessary abstractions
4. **Test your patterns** thoroughly
5. **Document complex patterns** for team understanding

## Conclusion

Advanced React patterns provide powerful tools for building scalable, maintainable applications. By understanding when and how to apply these patterns, you can create more robust and reusable components.

Remember: **patterns are tools, not rules**. Use them judiciously based on your specific requirements and team needs.

Start implementing these patterns in your next React project and experience the benefits of well-structured, maintainable code!
