import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Email from "../assets/email.png";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in a real app, you would call an API
    localStorage.setItem("token", "mock-token");
    navigate("/admin");
  };

  // Hàm xử lý đăng nhập bằng Gmail (mock)
  const handleGoogleLogin = () => {
    alert("Đăng nhập bằng Gmail");
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Đăng nhập tài khoản
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Đăng nhập bằng tài khoản hoặc email
              </label>
              <input
                className="shadow-lg appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                className="shadow-lg appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="password"
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition ease-in-out duration-300"
                type="submit"
              >
                Đăng nhập
              </button>
            </div>
          </form>

          {/* Nút đăng nhập bằng Gmail */}
          <div className="mt-4 text-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center bg-red-400 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-300"
            >
              <img
                src={Email}
                alt="Gmail Logo"
                className="w-6 h-6 mr-3"
              />
              Đăng nhập bằng Gmail
            </button>
          </div>

          {/* Dòng "Quên mật khẩu?" và "Đăng ký" */}
          <div className="mt-4 text-center
            flex justify-between
          
          " >
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 transition duration-200">
              Quên mật khẩu ?
            </Link>
            <span className="mx-2" ></span>
            <Link to="/register" className="text-blue-600 hover:text-blue-800 transition duration-200">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
