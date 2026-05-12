import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutPage from "../landing_page/about/AboutPage";
import HomePage from "../landing_page/home/HomePage";
import Login from "../landing_page/login/Login";
import PricingPage from "../landing_page/pricing/PricingPage";
import ProductsPage from "../landing_page/products/ProductsPage";
import SignUp from "../landing_page/signup/SignUp";
import SupportPage from "../landing_page/supports/SupportPage";
import NotFound from '../landing_page/NotFound'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },
            {
                path: "pricing",
                element: <PricingPage />,
            },
            {
                path: "support",
                element: <SupportPage />,
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    }
]);

export default router;

