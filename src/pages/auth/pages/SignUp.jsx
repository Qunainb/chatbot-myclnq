import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../services/authService";
import useAuthStore from "../../../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Country } from "country-state-city";
import CustomDropdown from "../../../components/CustomDropdown";

export default function SignUp() {
  const { setUser, setLoading, clearAuth } = useAuthStore();
  const [validationErrors, setValidationErrors] = useState({});
  const [countries] = useState(Country.getAllCountries().map(country => ({
    value: country.phonecode, // Using phonecode as value
    label: `${country.name} (+${country.phonecode})`,
    phoneCode: country.phonecode,
    flag: country.flag,
    name: country.name
  })));
  
  const [formData, setFormData] = useState({
    countryCode: "",
    mobileNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    height: "",
    weight: "",
    heightType: "cm",
    weightType: "kg",
    password: "",
    confirmPassword: "",
  });

  const showToast = (message, type = "error") => {
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
      showToast("Registration successful!", "success");
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        const errorData = error.response.data;
        if (Array.isArray(errorData.detail)) {
          const newErrors = {};
          errorData.detail.forEach((err) => {
            const field = err.loc[err.loc.length - 1];
            newErrors[field] = err.msg;
          });
          setValidationErrors(newErrors);
          showToast("Please fix the form errors");
        } else if (typeof errorData.detail === "string") {
          if (errorData.detail.includes("password")) {
            setValidationErrors({ confirmPassword: errorData.detail });
          } else if (errorData.detail.includes("email")) {
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
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCountryCodeChange = (phoneCode) => {
    setFormData(prev => ({
      ...prev,
      countryCode: phoneCode
    }));
  };

  const handleHeightTypeChange = (value) => {
    setFormData({ ...formData, heightType: value });
  };

  const handleWeightTypeChange = (value) => {
    setFormData({ ...formData, weightType: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.countryCode) errors.countryCode = "Country code is required";
    if (!formData.mobileNumber.trim() || !/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Valid 10-digit mobile number is required";
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) errors.gender = "Gender is required";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showToast("Please fix the form errors");
      return;
    }

    const submissionData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      countryCode: formData.countryCode,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      height: formData.height,
      weight: formData.weight,
      heightType: formData.heightType,
      weightType: formData.weightType,
      password: formData.password
    };

    mutation.mutate(submissionData, {
      onSuccess: (response) => {
        if (response?.token) {
          localStorage.setItem('authToken', response.token);
          setUser({ ...response.user, token: response.token });
        }
      }
    });
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName] ? (
      <span className="text-red-500 text-xs block mt-1">
        {validationErrors[fieldName]}
      </span>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-zinc-200 py-6 px-8 md:px-[8%]">
      <ToastContainer />
      <img src={logo} className="w-52" />
      <div className="container mx-auto w-full max-w-[550px] px-14 py-10 bg-zinc-50 rounded-2xl shadow-2xl my-4 md:my-0">
        <h1 className="text-3xl mb-4 font-medium">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-12 items-center">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
              />
              {getFieldError("firstName")}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
              />
              {getFieldError("lastName")}
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError("email")}
          </div>

          <div>
            <CustomDropdown
              options={countries}
              value={formData.countryCode}
              onChange={handleCountryCodeChange}
              placeholder="Select Country Code"
              className="mt-3"
              error={validationErrors.countryCode}
              renderOption={(option) => (
                <div className="flex items-center">
                  <span className="mr-2">{option.flag}</span>
                  <span>{option.name}</span>
                  <span className="ml-2 text-gray-500">+{option.phoneCode}</span>
                </div>
              )}
            />
            {getFieldError("countryCode")}
          </div>

          <div>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              minLength={10}
              maxLength={10}
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError("mobileNumber")}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError("password")}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError("confirmPassword")}
          </div>

          <div>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
            />
            {getFieldError("dateOfBirth")}
          </div>

          <div className="flex gap-12 items-center">
            <div className="flex-1">
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height"
                min="0"
                className="w-full py-2 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
              />
            </div>

            <div className="flex-1">
              <CustomDropdown
                options={[
                  { value: 'cm', label: 'Centimeters (cm)' },
                  { value: 'ft', label: 'Feet & Inches (ft)' }
                ]}
                value={formData.heightType}
                onChange={handleHeightTypeChange}
                placeholder="Height Unit"
                className="mt-3"
              />
            </div>
          </div>

          <div className="flex gap-12 items-center">
            <div className="flex-1">
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder={`Weight (${formData.weightType})`}
                min="0"
                step={formData.weightType === 'kg' ? '0.1' : '0.5'}
                className="w-full py-2 px-3 my-3 border-b-2 border-gray-300 text-md outline-0"
              />
            </div>

            <div className="flex-1">
              <CustomDropdown
                options={[
                  { value: 'kg', label: 'Kilograms (kg)' },
                  { value: 'lbs', label: 'Pounds (lbs)' }
                ]}
                value={formData.weightType}
                onChange={handleWeightTypeChange}
                placeholder="Weight Unit"
                className="mt-3"
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
                  value="Male"
                  checked={formData.gender === "Male"}
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
                  value="Female"
                  checked={formData.gender === "Female"}
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
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                  className="mx-2"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            {getFieldError("gender")}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full mt-5 text-base cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg border-0 outline-0 hover:bg-red-600 disabled:bg-red-300"
          >
            {mutation.isPending ? "Registering..." : "Register"}
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