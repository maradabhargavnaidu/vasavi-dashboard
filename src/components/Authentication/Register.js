import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const userCollection = collection(db, "users");
  const Navigate = useNavigate();
  const Register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        addDoc(userCollection, {
          registerEmail,
          registerPassword,
          isUser: 1,
        });
        Navigate("/");
      })
      .catch((error) => {
        const errorcode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div>
      <div className="bg-[#353c4e] min-h-screen font-abc">
        <div className="container flex flex-col items-center justify-center h-screen mx-auto px-5">
          <form className="w-full max-w-md bg-white flex flex-col justify-center items-left rounded-md p-6 space-y-3">
            <h1 className="font-extrabold text-2xl">Create your account</h1>
            <label className="font-semibold">Your Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounded p-3 border-gray-400 border-2 outline-blue-500"
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
            />
            <label className="font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="rounded p-3 border-gray-400 border-2 outline-blue-500"
              onChange={(e) => {
                setRegisterPassword(e.target.value);
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
              className="bg-[rgba(0,255,0,0.2)] border-green-700 border-2 font-semibold p-3 rounded text-green-900"
              onClick={Register}
            >
              Sign Up
            </button>
            <p>
              Already have an account ?&nbsp;&nbsp;
              <Link to="/" className=" font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
