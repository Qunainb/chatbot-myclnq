import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-zinc-200 py-6 px-8 md:px-[8%]">
      <img src={logo} className="w-52" />
      <div className="container mx-auto w-full max-w-[550px] px-14 py-10 bg-zinc-50 rounded-2xl shadow-2xl">
        <h1 className="text-3xl mb-4 font-medium">Sign Up</h1>
        <form>
          <div className="flex gap-12 items-center">
            <input
              type="text"
              placeholder="First Name"
              required
              className="h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              className="h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0"
            />
          </div>
          <input
            type="tel"
            placeholder="Mobile Number"
            required
            className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0"
          />
          <input
            type="date"
            placeholder="Date Of Birth"
            required
            className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0 "
          />
          <input
            type="text"
            placeholder="Gender"
            required
            className="w-full h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0"
          />
          <div className="flex gap-12 items-center">
            <input
              type="number"
              placeholder="Height (cm)"
              min="0"
              className=" h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              min="0"
              className=" h-8 py-4 px-3 my-3 border-b-2 border-gray-300 text-sm outline-0"
            />
          </div>

          <button className="w-full mt-5 text-base cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg border-0 outline-0 hover:bg-red-600">
            Register
          </button>
        </form>
        <div className="mt-6">
          <p className="mb-1">
            Already have an account
            <Link
              className="ml-3 underline cursor-pointer font-medium"
              to="/login"
            >
              {" "}
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
