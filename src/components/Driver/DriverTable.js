import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
const Table = () => {
  const Navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const driverCollection = collection(db, "Drivers");
  const [userInfo, setUserInfo] = useState();

  const getDrivers = async () => {
    const data = await getDocs(driverCollection);
    setDrivers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const updatedriver = (id) => {
    Navigate("/updatedriver/" + id);
  };
  const deleteDriver = async (id) => {
    const driverdoc = doc(db, "Drivers", id);
    await deleteDoc(driverdoc);
    window.location.reload();
  };

  useEffect(() => {
    getDrivers();
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      console.log("executing");
    });
  }, []);

  return (
    <div className="md:w-[80%] md:px-4 md:float-right">
      {/*=== TOP HEADER ===*/}
      <main>
        <div className="flex justify-between container mx-auto mt-6 px-4">
          {/*=== DRIVERS HEADING ===*/}
          <h1 className="md:text-3xl text-xl font-semibold">Drivers</h1>
          {/*=== NAVIGATES TO DRIVERS BASIC INFORMATION PAGE ===*/}
          <Link
            to="/driver/createuser"
            className={
              "bg-[rgba(0,255,0,0.2)] text-green-600 hover:bg-[rgba(0,255,0,0.1)] border-green-600 border-2 px-4 text-white py-2 rounded-md " +
              (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
          >
            Create Driver +
          </Link>
        </div>
      </main>
      {/*=== DRIVER ===*/}
      <div className="mt-16 container mx-auto">
        <div className="shadow-sm shadow-gray-400 flex justify-between py-5 container w-full mx-auto">
          <div>
            {/*=== TABLE SEARCH BAR ===*/}
            <input
              type="text"
              placeholder="Search"
              className="border-gray-200 border-2 rounded-md p-2 ml-4 w-36 md:w-60"
            />
            <i class="fa-solid fa-magnifying-glass ml-5"></i>
          </div>
          {/*=== DOWNLOAD REPORT BUTTON ===*/}
          <Link
            to="/"
            className="bg-orange-400 px-4 text-white py-2 rounded-md mr-4"
          >
            Download Report <i class="fa-solid fa-download"></i>
          </Link>
        </div>
        {/*=== TABLE STARTS HERE ===*/}
        <table className="container mx-auto text-center hidden md:table">
          <tr className="shadow-sm shadow-gray-400 container px-8">
            {/*=== HEADING OF TABLE ===*/}
            <th className="py-5">Serial No</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone</th>
            <th>License No</th>
            <th>Address</th>
          </tr>
          {/* RENDERING DRIVER DATA ON WEBSITE */}
          {drivers.map((data, index) => (
            <tr className="shadow-sm shadow-gray-400  container hover:cursor-pointer group-hover:hidden">
              <td className="py-5">{index + 1}</td>
              <td>{data.fullName}</td>
              <td>{data.gender}</td>
              <td>{data.age}</td>
              <td>{data.phone}</td>
              <td>{data.licenseNo}</td>
              <td>{data.address}</td>
              <td>
                <button
                  className={
                    "px-1 " +
                    (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
                  }
                  onClick={() => {
                    updatedriver(data.id);
                  }}
                >
                  <i class="fa-solid fa-pencil"></i>
                </button>
              </td>
              <td>
                <button
                  className={
                    "px-1 " +
                    (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
                  }
                  onClick={() => {
                    deleteDriver(data.id);
                  }}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </table>
        {/*=== CARDS ON MOBILE VIEW ===*/}
        <div>
          {drivers.map((data) => (
            <div className="shadow-sm shadow-gray-300 container mx-auto md:hidden px-5 py-5 my-2">
              <p>
                <span className="text-md font-medium text-red-500">No: </span>1
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Full Name:{" "}
                </span>
                {data.fullName}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Gender:{" "}
                </span>
                {data.gender}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">Age: </span>
                {data.age}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  License Number:{" "}
                </span>
                {data.licenseNo}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Address:{" "}
                </span>
                {data.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
