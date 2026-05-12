import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Signup failed");
        return;
      }

      setMessage(data.message || "Signup successful");
      navigate("/login");
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
          <h2 className="mb-4 text-center">Create Account</h2>

          <form className="border rounded p-4 shadow-sm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-control"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Enter username"
                required
                type="text"
                value={formData.username}
              />
            </div>

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
                minLength="6"
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
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
