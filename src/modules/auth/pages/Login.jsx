import { Link } from "react-router-dom";
import myClnqLogo from "../../../assets/logo.png";

export default function Login() {
  return (
    <div className="min-h-screen bg-zinc-200 py-6 px-8 md:px-[8%]">
      <img src={myClnqLogo} className="w-52" />
      <div className="container mx-auto w-full max-w-[450px] p-14 bg-zinc-50 rounded-2xl shadow-2xl mt-24 md:mt-16">
        <h1 className="text-3xl mb-7 font-medium">Sign In</h1>
        <form>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full h-12 py-4 px-3 my-3 border-b-2 border-gray-300 text-lg outline-0 "
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 py-4 px-3 my-3 border-b-2 border-gray-300 text-lg outline-0"
            required
          />
          <button className="w-full mt-5 text-base cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg border-0 outline-0 hover:bg-red-600">
            Sign in
          </button>
          <div className="flex justify-between items-center mt-3 text-sm">
            <div className="flex  items-center gap-1.5">
              <input type="checkbox" className="w-4 h-4 " />
              <p>Remember me</p>
            </div>
            <p className="underline cursor-pointer">Forget your password</p>
          </div>
        </form>
        <div className="mt-6">
          <p className="mb-1">
            Doesn't have account
            <Link
              className="ml-3 underline cursor-pointer font-medium"
              to="/signup"
            >
              {" "}
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
