import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import React from "react";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../../services/authService';
import useAuthStore from '../../../store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
  const { setUser, setLoading, clearAuth } = useAuthStore();
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    country: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    gender: "",
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
    mutationFn: registerUser,
    onMutate: () => {
      setLoading(true);
      clearAuth();
      setValidationErrors({});
    },
    onSuccess: (data) => {
      setUser(data.user);
      showToast('Registration successful!', 'success');
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        const errorData = error.response.data;
        if (Array.isArray(errorData.detail)) {
          // Handle multiple validation errors
          const newErrors = {};
          errorData.detail.forEach(err => {
            const field = err.loc[err.loc.length - 1]; // Get the field name
            newErrors[field] = err.msg;
          });
          setValidationErrors(newErrors);
          showToast('Please fix the form errors');
        } else if (typeof errorData.detail === 'string') {
          // Handle single error message
          if (errorData.detail.includes('password')) {
            setValidationErrors({ confirmPassword: errorData.detail });
          } else if (errorData.detail.includes('email')) {
            setValidationErrors({ email: errorData.detail });
          }
          showToast(errorData.detail);
        }
      } else {
        showToast(error.message || "Registration failed");
      }
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.mobileNumber.trim() || !/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = 'Valid 10-digit mobile number is required';
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showToast('Please fix the form errors');
      return;
    }
    
    mutation.mutate(formData);
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName] ? (
      <span className="text-red-500 text-xs block mt-1">{validationErrors[fieldName]}</span>
    ) : null;
  };

  const { firstName, lastName, email, mobileNumber, country, password, confirmPassword, dateOfBirth, height, weight, gender } = formData;
  
  return (
    <div className="min-h-screen bg-zinc-200 py-6 px-8 md:px-[8%]">
      <ToastContainer />
      <img src={logo} className="w-52" />
      <div className="container mx-auto w-full max-w-[550px] px-14 py-10 bg-zinc-50 rounded-2xl shadow-2xl">
        <h1 className="text-3xl mb-4 font-medium">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-12 items-center">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
              />
              {getFieldError('firstName')}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
              />
              {getFieldError('lastName')}
            </div>
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError('email')}
          </div>

          <div>
            <input
              type="text"
              name="country"
              value={country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError('country')}
          </div>
          
          <div>
            <input
              type="tel"
              name="mobileNumber"
              value={mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              minLength={10}
              maxLength={10}
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError('mobileNumber')}
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError('password')}
          </div>
          
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError('confirmPassword')}
          </div>
          
          <div>
            <input
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={handleChange}
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError('dateOfBirth')}
          </div>
          
          <div className="flex gap-12 items-center">
            <div className="flex-1">
              <input
                type="number"
                name="height"
                value={height}
                onChange={handleChange}
                placeholder="Height (cm)"
                min="0"
                className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                name="weight"
                value={weight}
                onChange={handleChange}
                placeholder="Weight (kg)"
                min="0"
                className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between">
              <div>
                <input 
                  type="radio" 
                  name="gender" 
                  id="male" 
                  value="male" 
                  checked={gender === 'male'}
                  onChange={handleChange}
                  className="mx-2"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  name="gender" 
                  id="female" 
                  value="female" 
                  checked={gender === 'female'}
                  onChange={handleChange}
                  className="mx-2"
                />
                <label htmlFor="female">Female</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  name="gender" 
                  id="other" 
                  value="other" 
                  checked={gender === 'other'}
                  onChange={handleChange}
                  className="mx-2"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            {getFieldError('gender')}
          </div>

          <button 
            type="submit"
            disabled={mutation.isPending}
            className="w-full mt-5 text-base cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg border-0 outline-0 hover:bg-red-600 disabled:bg-red-300"
          >
            {mutation.isPending ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-6">
          <p className="mb-1">
            Already have an account?
            <Link
              className="ml-3 underline cursor-pointer font-medium"
              to="/login"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}