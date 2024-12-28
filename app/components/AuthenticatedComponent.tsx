/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
interface AuthenticatedComponentProps {
  renderComponent: () => JSX.Element; 
}
const AuthenticatedComponent:React.FC<AuthenticatedComponentProps> = ({ renderComponent: RenderComponent }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ email:"", username: "", password: "" });

  // Environment credentials (to be replaced with process.env in production)
  const correctEmail= process.env.NEXT_PUBLIC_AUTH_EMAIL;
  const correctUsername = process.env.NEXT_PUBLIC_AUTH_USERNAME;
  const correctPassword = process.env.NEXT_PUBLIC_AUTH_PASSWORD;

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e:any) => {
    e.preventDefault();

    // Validate credentials
    if (
      formData.email ===   correctEmail &&
      formData.username === correctUsername &&
      formData.password === correctPassword
    ) {
      setIsAuthenticated(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Login credentials are not correct.");
    }
  };

  if (isAuthenticated) {
    return <RenderComponent />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1 className="text-xl font-bold mb-4">Authentication</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="email"
            className="border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthenticatedComponent;
