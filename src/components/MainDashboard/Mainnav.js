import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const Mainnav = () => {
  const [userInfo, setUserInfo] = useState();
  const [menuToggle, setMenuToggle] = useState(true);
  const [ProfileToggle, setProfileToggle] = useState(true);

  const Navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      console.log("executing");
    });
  }, []);

  const logout = async () => {
    signOut(auth);
    Navigate("/");
  };

  function Toggle() {
    setMenuToggle(!menuToggle);
  }
  function profileToggle() {
    setProfileToggle(!ProfileToggle);
  }

  return (
    <div>
      <nav className=" shadow-sm shadow-gray-500 font-abc">
        <div class=" flex  md:space-x-0 w-full justify-between mx-auto shadow-gray-100 shadow-sm">
          <div class="flex bg-blue-600 justify-between py-5 items-center px-5 w-[56%] md:w-[20%]">
            <Link to="/">
              <h3 class="text-white text-lg font-semibold">VASAVI COLLEGE</h3>
            </Link>
            <div onClick={Toggle} className="hidden md:block">
              <i
                class={
                  "fa-solid text-white cursor-pointer " +
                  (menuToggle ? "fa-toggle-on" : "fa-toggle-off")
                }
              ></i>
            </div>
            <div onClick={Toggle} className="md:hidden">
              <i
                class={
                  "fa-solid text-white cursor-pointer " +
                  (menuToggle ? "fa-toggle-off" : "fa-toggle-on")
                }
              ></i>
            </div>
          </div>
          <div className="py-5 px-5">
            <div className="flex justify-between items-center">
              {/*=== ACCOUNT PICTURE NAME AND DETAIL ===*/}
              <div
                className="flex items-center justify-between space-x-3"
                onClick={profileToggle}
              >
                <i class="fa-solid fa-user bg-gray-200 p-3 rounded-full text-gray-400 cursor-pointer hover:bg-gray-100"></i>
                <div
                  className={
                    "hidden md:" + (ProfileToggle ? "hidden" : "block")
                  }
                >
                  <p className="text-sm font-medium">{userInfo?.email}</p>
                  <p className="text-sm">
                    {userInfo?.email === "admin@gmail.com" ? "Admin" : "User"}
                  </p>
                </div>
                <button
                  className="bg-blue-600 px-4 text-gray-100 font-semibold py-2 rounded-md flex items-center "
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={
          "flex flex-col bg-gray-100 w-[56.5%] text-[#4f5d73] font-abc absolute z-50 float-left md:w-[20%] shadow-sm shadow-gray-400 md:h-[89.9vh] px-8 py-5 " +
          (menuToggle ? "md:block hidden" : "md:hidden block")
        }
      >
        <ul>
          <li className="py-2 hover:text-blue-600 text-lg">
            <Link to="/main">
              <i class="fa-solid fa-house text-blue-600"></i>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dashboard
            </Link>
          </li>
          <li className="py-2 hover:text-blue-600 text-lg">
            <Link to="/expense">
              <i class="fa-solid fa-hand-holding-dollar text-blue-600"></i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Expense
            </Link>
          </li>
          <li className="py-2 hover:text-blue-600 text-lg">
            <Link to="/buses">
              <i class="fa-solid fa-bus text-blue-600"></i>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bus
            </Link>
          </li>
          <li className="py-2 hover:text-blue-600 text-lg">
            <Link to="/students">
              <i class="fa-solid fa-users text-blue-600"></i>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Students
            </Link>
          </li>
          <li className="py-2 hover:text-blue-600 text-lg">
            <Link to="/driver">
              <i class="fa-solid fa-id-card text-blue-600"></i>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drivers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Mainnav;
