import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';
import './index.css';

import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/Signup';
import Login from './landing_page/Login';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import NotFound from './landing_page/NotFound';

/* Shared layout — single Navbar + Footer wrapper */
function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/',         element: <HomePage />   },
      { path: '/signup',   element: <Signup />     },
      { path: '/login',    element: <Login />      },
      { path: '/about',    element: <AboutPage />  },
      { path: '/product',  element: <ProductPage />},
      { path: '/pricing',  element: <PricingPage />},
      { path: '/support',  element: <SupportPage />},
      { path: '*',         element: <NotFound />   },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);