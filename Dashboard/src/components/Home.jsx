import React, { useEffect, useState } from "react";
import axios from 'axios';
import Dashboard from "./Dashboard.jsx";
import TopBar from "./TopBar.jsx";

const Home = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log("api url", `${import.meta.env.VITE_API_URL}/auth/me`)
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          {
            withCredentials: true,
          }
        );

        if (!res.data.success) {
          window.location.href = import.meta.env.VITE_FRONTEND_URL + "/login";
          return;
        }

        setUser(res.data.user);

      } catch (error) {
        console.log(import.meta.env.VITE_FRONTEND_URL + "/login")
        window.location.href = import.meta.env.VITE_FRONTEND_URL + "/login";
      }
    };

    getUser();
  }, []);

  if (!user) return <div>Loading...</div>;


  return (
    <>
      <TopBar user={user}/>
      <Dashboard user={user} />
    </>
  );
};

export default Home;
