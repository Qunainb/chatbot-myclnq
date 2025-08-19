import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/pages/Login";
import SignUp from "./pages/auth/pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chat from "./pages/Dashboard/pages/Chat";
import Dashboard from "./pages/Dashboard/pages/Dashboard";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/chat", element: <Chat /> },
  { path: "/dashboard", element: <Dashboard/>},
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
