export const registerUser = async (userData) => {
  console.log(userData)
  const response = await fetch('http://localhost:8000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      country: userData.country,
      mobileNumber: userData.mobileNumber,
      password: userData.password,
      confirm_password: userData.confirmPassword,
      dateOfBirth: userData.dateOfBirth,
      height: userData.height,
      weight: userData.weight,
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