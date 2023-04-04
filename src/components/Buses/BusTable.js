import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

const BusTable = () => {
  const [buses, setBuses] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const busCollection = collection(db, "Buses");
  const Navigate = useNavigate();

  const getBuses = async () => {
    const data = await getDocs(busCollection);
    setBuses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteBus = async (id) => {
    const busdoc = doc(db, "Buses", id);
    await deleteDoc(busdoc);
    window.location.reload();
  };
  const update = (id) => {
    Navigate("/updatebus/" + id);
  };
  useEffect(() => {
    getBuses();
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      console.log("executing");
    });
  }, []);

  return (
    <div className="md:w-[80%] md:float-right md:px-4">
      {/*=== TOP HEADER ===*/}
      <main>
        <div className="flex justify-between container mx-auto mt-6 px-4">
          {/*=== BUSES HEADING ===*/}
          <h1 className="md:text-4xl text-xl font-semibold text-[#353c4e]">
            Buses
          </h1>
          {/*=== NAVIGATES TO BUSES BASIC INFORMATION PAGE ===*/}
          <Link
            to="/buses/newbus"
            className={
              "bg-[rgba(0,255,0,0.2)] text-green-600 hover:bg-[rgba(0,255,0,0.1)] border-green-600 border-2 px-4 py-2 rounded-md " +
              (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
          >
            New Bus +
          </Link>
        </div>
      </main>
      {/*=== BUS ===*/}
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
            className="bg-[rgba(255,153,0,0.2)] border-orange-600 border-2 text-orange-600 px-4 hover:bg-[rgba(255,153,0,0.1)] py-2 rounded-md mr-4"
          >
            Download Report <i class="fa-solid fa-download"></i>
          </Link>
        </div>
        {/*=== TABLE STARTS HERE ===*/}
        <table className="container mx-auto text-center hidden md:table">
          <tr className="shadow-sm shadow-gray-400 container px-8">
            {/*=== HEADING OF TABLE ===*/}
            <th></th>
            <th className="py-5">Serial No</th>
            <th>Bus Number</th>
            <th>Registration Number</th>
            <th>Route</th>
            <th>Bus Condition</th>
          </tr>
          {/* RENDERING DRIVER DATA ON WEBSITE */}
          {buses.map((data, index) => (
            <tr className="container shadow-sm shadow-gray-400   ">
              <td>
                <input type="checkbox" />
              </td>
              <td className="py-5">{index + 1}</td>
              <td>{data.busNo}</td>
              <td>{data.RegistrationNo}</td>
              <td>{data.route}</td>
              <td>{data.busCondition}</td>
              <td>
                <button
                  onClick={() => update(data.id)}
                  className={
                    "px-1 " +
                    (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
                  }
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
                    deleteBus(data.id);
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
          {buses.map((data) => (
            <div className="shadow-sm shadow-gray-300 container mx-auto md:hidden px-5 py-5 my-2">
              <p>
                <span className="text-md font-medium text-red-500">No: </span>1
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Bus Number:{" "}
                </span>
                {data.busNo}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Registration Number:{" "}
                </span>
                {data.RegistrationNo}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Route:{" "}
                </span>
                {data.route}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Bus Condition:{" "}
                </span>
                {data.busCondition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusTable;
