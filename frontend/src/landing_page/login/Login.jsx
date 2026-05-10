import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch("http://localhost:3000/auth/login", {
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
      navigate("/");
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
