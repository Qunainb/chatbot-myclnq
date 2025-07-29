const isDevelopement = true;
const backendUrl = isDevelopement ? "http://localhost:8000" : process.env.BACKEND_URL;
export default backendUrl;