import { ReactNode } from 'react';
import './App.css';

function App ({ children }: { children?: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
};

export default App;
