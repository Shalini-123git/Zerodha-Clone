import React from "react";
import { createBrowserRouter} from "react-router-dom";
import "./index.css";
import Home from "./components/Home.jsx";
import Summary from "./components/Summary.jsx";
import Orders from "./components/Orders.jsx";
import Holdings from "./components/Holdings.jsx";
import Positions from "./components/Positions.jsx";
import Funds from "./components/Funds.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Apps from "./components/Apps.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Summary />
      },
      {
        path: "orders",
        element: <Orders />
      },
      {
        path: "holdings",
        element: <Holdings/>
      },
      {
        path: "positions",
        element: <Positions />
      },
      {
        path: "funds",
        element: <Funds/>
      },
      {
        path: "apps",
        element: <Apps />
      }
    ]
  },
])

export default router;
