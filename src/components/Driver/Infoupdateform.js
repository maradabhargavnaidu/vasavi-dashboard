import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import Mainnav from "../MainDashboard/Mainnav";
const Updateinfoform = () => {
  //STORING DATA IN VARIABLES
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const driverCollection = doc(db, "Drivers", id);
  //UPDATE FUNCTION
  const updateDriver = async () => {
    const Busdoc = doc(db, "Drivers", id);
    await updateDoc(Busdoc, {
      fullName: driver.fullName,
      gender: driver.gender,
      age: driver.age,
      phone: driver.phone,
      address: driver.address,
      licenseNo: driver.licenseNo,
    });
  };
  useEffect(() => {
    const DriverData = async () => {
      const data = await getDoc(driverCollection);
      setDriver(data.data());
    };
    DriverData();
  }, []);
  return (
    <>
      <Mainnav />
      <div className="md:w-[80%] md:px-4 md:float-right">
        {/*=== DRIVER FORM START HERE ===*/}
        <main className="container mx-auto mt-5">
          <h1 className="font-medium text-4xl text-center">
            Basic Information
          </h1>
          <form className="mt-8 flex flex-col md:space-y-6 container px-4">
            {/* COMBINING TWO INPUT IN FLEX */}
            <div className="flex-col flex md:flex-row justify-around items-center">
              {/*=== FULL NAME ===*/}
              <div className="flex flex-col justify-center items-start">
                <label className="font-medium">Full Name:</label>
                <input
                  type="text"
                  className="border-gray-300 border-2 rounded-md px-4  md:w-[400px] w-[375px] h-12"
                  onChange={(e) => {
                    setDriver({ ...driver, fullName: e.target.value });
                  }}
                  value={driver.fullName}
                  placeholder="Full Name"
                />
              </div>
              {/*=== GENDER ===*/}
              <div className="flex flex-col justify-center items-start">
                <label className="font-medium">Gender:</label>
                <input
                  type="text"
                  className="border-gray-300 border-2 rounded-md px-4  md:w-[400px] w-[375px] h-12"
                  onChange={(e) => {
                    setDriver({ ...driver, gender: e.target.value });
                  }}
                  value={driver.gender}
                  placeholder="Gender"
                />
              </div>
            </div>
            {/* COMBINING TWO INPUT IN FLEX */}
            <div className="flex flex-col md:flex-row justify-around items-center">
              {/*=== AGE ===*/}
              <div className="flex flex-col justify-center items-start">
                <label className="font-medium">Age:</label>
                <input
                  type="number"
                  className="border-gray-300 border-2 rounded-md px-4  md:w-[400px] w-[375px] h-12"
                  onChange={(e) => {
                    setDriver({ ...driver, age: e.target.value });
                  }}
                  value={driver.age}
                  placeholder="Age"
                />
              </div>
              {/*=== PHONE NUMBER ===*/}
              <div className="flex flex-col justify-center items-start">
                <label className="font-medium">Phone:</label>
                <input
                  type="text"
                  className="border-gray-300 border-2 rounded-md px-4  md:w-[400px] w-[375px] h-12"
                  onChange={(e) => {
                    setDriver({ ...driver, phone: e.target.value });
                  }}
                  value={driver.phone}
                  placeholder="Phone"
                />
              </div>
            </div>
            {/* COMBINING TWO INPUT IN FLEX */}
            <div className="flex flex-col md:flex-row justify-around items-center">
              {/*=== ADDRESS ===*/}
              <div className="flex flex-col justify-center items-start">
                <label className="font-medium">Address:</label>
                <input
                  type="textarea"
                  className="border-gray-300 border-2 rounded-md px-4 md:w-[400px] w-[375px] h-12"
                  onChange={(e) => {
                    setDriver({ ...driver, address: e.target.value });
                  }}
                  value={driver.address}
                  placeholder="Address"
                />
              </div>
              {/*=== LICENSE NUMBER ===*/}
              <div className="flex flex-col justify-center items-start">
                <label className="font-medium">License Number:</label>
                <input
                  type="text"
                  className="border-gray-300 border-2 rounded-md px-4  md:w-[400px] w-[375px] h-12"
                  onChange={(e) => {
                    setDriver({ ...driver, licenseNo: e.target.value });
                  }}
                  value={driver.licenseNo}
                  placeholder="License Number"
                />
              </div>
            </div>
          </form>
          {/*=== BACK AND SUBMIT BUTTONS ===*/}
          <div className=" md:text-right space-x-5 md:mt-20 md:mr-32 mt-10 text-center">
            {/*=== BACK BUTTON ===*/}
            <Link
              to="/driver"
              className="bg-gray-200 px-10 text-gray-600 rounded-md py-4"
            >
              Back
            </Link>
            {/*=== SUBMIT BUTTON ===*/}
            <Link
              to="/driver"
              className="bg-orange-400 px-10 text-white py-4 rounded-md"
              onClick={updateDriver}
            >
              Update
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default Updateinfoform;
