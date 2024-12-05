import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/home.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const savedTheme = localStorage.getItem("theme");
document.body.classList.add(savedTheme ? savedTheme : "light");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

root.render(
  // <Provider store={store}>
    <RouterProvider router={router} />
  // </Provider>
);