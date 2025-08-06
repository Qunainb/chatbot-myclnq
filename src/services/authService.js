import backendUrl from "../utils/config";

export const registerUser = async (userData) => {
  const response = await fetch(`${backendUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      countryCode: userData.countryCode,
      mobileNumber: userData.mobileNumber,
      password: userData.password,
      dateOfBirth: userData.dateOfBirth,
      height: userData.height,
      weight: userData.weight,
      heightType: userData.heightType,
      weightType: userData.weightType,
      gender: userData.gender,
    }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.detail || 'Registration failed');
    error.response = { status: response.status, data };
    throw error;
  }
  
  return data;
};

export const loginUser = async (credentials) => {
  // console.log(credentials);
  const response = await fetch(`${backendUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'Login failed');
    error.response = response;
    throw error;
  }
  
  return data;
};