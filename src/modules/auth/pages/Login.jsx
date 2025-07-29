import { Link } from "react-router-dom";
import myClnqLogo from "../../../assets/logo.png";
import React from "react";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../../services/authService';
import useAuthStore from '../../../store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { setUser, setLoading, setToken } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const showToast = (message, type = 'error') => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setUser(data.user);
      // setToken(data.token);
      if (formData.rememberMe) {
        localStorage.setItem('authToken', data.token);
      } else {
        sessionStorage.setItem('authToken', data.token);
      }
      showToast('Login successful!', 'success');
      Navigate('/dashboard')
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.detail || 
                         error.message || 
                         "Login failed";
      showToast(errorMessage);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: formData.email,
      password: formData.password
    });
  };

  return (
    <div className="min-h-screen bg-zinc-200 py-6 px-8 md:px-[8%]">
      <ToastContainer />
      <img src={myClnqLogo} className="w-52" />
      <div className="container mx-auto w-full max-w-[450px] p-14 bg-zinc-50 rounded-2xl shadow-2xl mt-24 md:mt-16">
        <h1 className="text-3xl mb-7 font-medium">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full h-12 py-4 px-3 my-3 border-b-2 border-gray-300 text-lg outline-0"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full h-12 py-4 px-3 my-3 border-b-2 border-gray-300 text-lg outline-0"
            required
          />
          <button 
            type="submit"
            disabled={mutation.isPending}
            className="w-full mt-5 text-base cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg border-0 outline-0 hover:bg-red-600 disabled:bg-red-300"
          >
            {mutation.isPending ? 'Signing in...' : 'Sign in'}
          </button>
          <div className="flex justify-between items-center mt-3 text-sm">
            <div className="flex items-center gap-1.5">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4" 
              />
              <p>Remember me</p>
            </div>
            <Link to="/forgot-password" className="underline cursor-pointer">
              Forgot password
            </Link>
          </div>
        </form>
        <div className="mt-6">
          <p className="mb-1">
            Don't have an account?
            <Link
              className="ml-3 underline cursor-pointer font-medium"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}