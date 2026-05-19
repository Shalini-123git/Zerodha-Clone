import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          withCredentials: true, 
        });

        const data = res.data;
        console.log(data);

        if(!data.success){
          setMessage(data.message || "Login failed");
          return;
        }

        setMessage(data.message || "Login successfull");

        window.location.href = import.meta.env.VITE_DASHBOARD_URL;

      } catch (error) {
        setMessage(
          error.response?.data?.message || "Unable to connect to server"
        );
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Login failed");
        return;
      }

      setMessage(data.message || "Login successful");
      window.location.href = import.meta.env.VITE_DASHBOARD_URL;
    } catch (error) {
      setMessage("Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="mb-4 text-center">Login</h2>

          <form className="border rounded p-4 shadow-sm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter email"
                required
                type="email"
                value={formData.email}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                required
                type="password"
                value={formData.password}
              />
            </div>

            {message && <p className="text-danger mb-3">{message}</p>}

            <button className="btn btn-primary w-100" disabled={isLoading} type="submit">
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-3 text-center">
            New user? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
