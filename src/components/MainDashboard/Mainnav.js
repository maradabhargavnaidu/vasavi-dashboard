import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const Mainnav = () => {
  const [userInfo, setUserInfo] = useState();
  const [menuToggle, setMenuToggle] = useState(true);

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

  return (
    <div>
      <nav className=" shadow-sm shadow-gray-500">
        <div class=" flex  md:space-x-0 w-full justify-between mx-auto">
          <div class="flex bg-[#353c4e] justify-between py-5 items-center shadow-sm shadow-black px-5 w-[56%] md:w-[20%]">
            <Link to="/">
              <h6 class="text-[#919AA3]">VASAVI COLLEGE</h6>
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
              <div className="flex items-center justify-between space-x-3">
                <i class="fa-solid fa-user bg-green-700 p-3 rounded-full text-white"></i>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{userInfo?.email}</p>
                  <p className="text-sm">
                    {userInfo?.email === "admin@gmail.com" ? "Admin" : "User"}
                  </p>
                </div>
                <button
                  className="bg-red-400 px-3 text-white font-normal py-2 rounded-md flex items-center hover:bg-red-500"
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
          "flex flex-col bg-[#353c4e] w-[56.5%] text-[#dcdcdc] absolute float-left md:w-[20%] md:h-[89.9vh] px-8 py-5 " +
          (menuToggle ? "md:block hidden" : "md:hidden block")
        }
      >
        <ul>
          <li className="py-2">
            <Link to="/main">
              <i class="fa-solid fa-house"></i> Dashboard
            </Link>
          </li>
          <li className="py-2">
            <Link to="/expense">
              <i class="fa-solid fa-hand-holding-dollar"></i> Expense
            </Link>
          </li>
          <li className="py-2">
            <Link to="/buses">
              <i class="fa-solid fa-bus"></i> Bus
            </Link>
          </li>
          <li className="py-2">
            <Link to="/students">
              <i class="fa-solid fa-users"></i> Students
            </Link>
          </li>
          <li className="py-2">
            <Link to="/driver">
              <i class="fa-solid fa-id-card"></i> Drivers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Mainnav;
