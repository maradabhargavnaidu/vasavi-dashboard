import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  // const Navigate = useNavigate();
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
    <div className="bg-[#353c4e] min-h-screen">
      <div className="container flex flex-col items-center justify-center h-screen mx-auto px-5">
        <form className="w-full max-w-md bg-white flex flex-col justify-center items-left rounded-md p-6 space-y-3">
          <h1 className="font-semibold text-2xl ">Sign In to your account</h1>
          <label>Your Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="rounded p-3 border-gray-400 border-2 outline-blue-500"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
          <label>Password</label>
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
              <p>Remember me</p>
            </span>
            <a href="#">Forgot Password ?</a>
          </div>
          <button
            className="bg-green-500 p-3 rounded text-white"
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
              <div className="text-red-500">Wrong Email or Password</div>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
