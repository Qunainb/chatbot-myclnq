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
  const response = await fetch(`${backendUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {email: credentials.email,
      password: credentials.password,
      countryCode: credentials.countryCode,
      phoneNumber: credentials.phoneNumber,}
    ),
  });
  
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Login failed');
    error.response = response;
    throw error;
  }
  
  return data;
};

export const logoutUser = async (data) => {
  const response = await fetch(`${backendUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (!response.ok) {
    const err = new Error(res.message || 'Logout failed');
    err.response = res;
    throw err;
  }
  return res;
};

export const chatHistory = async (data) => {
  console.log("Printing Data",data.token)
  const response = await fetch(`${backendUrl}/data/all_chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.token}`
    },
  });

  const res = await response.json();
  console.log("Here is the response: -",res)
  if(!response.ok){
    const err = new Error(res.message || 'Data Fetching Failed');
    err.response = res;
    throw err;
  }
  return res;
}
