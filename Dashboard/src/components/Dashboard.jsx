import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import Apps from "./Apps.jsx";
import Funds from "./Funds.jsx";
import Holdings from "./Holdings.jsx";
import Home from "./Home.jsx";
import Orders from "./Orders.jsx";
import Positions from "./Positions.jsx";
import Summary from "./Summary.jsx";
import WatchList from "./WatchList.jsx";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
