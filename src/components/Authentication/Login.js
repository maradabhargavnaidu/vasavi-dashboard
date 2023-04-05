import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, login, password);
      Navigate("/main");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="bg-[#353c4e] min-h-screen font-abc">
      <div className="container flex flex-col items-center justify-center h-screen mx-auto px-5">
        <form className="w-full max-w-md bg-white flex flex-col justify-center items-left rounded-md p-6 space-y-3">
          <h1 className="font-extrabold text-2xl ">Sign In to your account</h1>
          <label className="font-semibold">Your Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="rounded p-3 border-gray-400 border-2 outline-blue-500"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
          <label className="font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="rounded p-3 border-gray-400 border-2 outline-blue-500"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-between">
            <span className="flex space-x-2 items-center">
              <input type="checkbox" className="w-4 h-4" />
              <p className="font-semibold">Remember me</p>
            </span>
            <a href="#" className="font-semibold">
              Forgot Password ?
            </a>
          </div>
          <button
            className="bg-[rgba(0,255,0,0.2)] border-green-700 border-2  p-3 rounded text-green-900 font-semibold"
            onClick={Login}
          >
            Sign In
          </button>
          <p>
            Don't have an account at?&nbsp;&nbsp;
            <Link to="/register" className="font-semibold">
              SignUp
            </Link>
            {error && (
              <div className="text-red-500 font-semibold">
                Wrong Email or Password
              </div>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
