import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const studentCollection = collection(db, "Students");
  const Navigate = useNavigate();

  const getStudents = async () => {
    const data = await getDocs(studentCollection);
    setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteStudent = async (id) => {
    const Expensedoc = doc(db, "Students", id);
    await deleteDoc(Expensedoc);
    window.location.reload();
  };
  const updatestudent = (id) => {
    Navigate("/updatestudent/" + id);
  };
  useEffect(() => {
    getStudents();
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
          <h1 className="md:text-3xl text-xl font-semibold">Students</h1>
          {/*=== NAVIGATES TO DRIVERS BASIC INFORMATION PAGE ===*/}
          <Link
            to="/students/createstudent"
            className={
              "bg-[rgba(0,255,0,0.2)] text-green-600 hover:bg-[rgba(0,255,0,0.1)] border-green-600 border-2 px-4 py-2 rounded-md " +
              (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
          >
            Add Student +
          </Link>
        </div>
      </main>
      {/*=== STUDENT ===*/}
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
        {/*=== TABLE STARTS HERE ONLY DESKTOP VIEW ===*/}
        <table className="container mx-auto text-center hidden md:table">
          <tr className="shadow-sm shadow-gray-400 container px-8">
            {/*=== HEADING OF TABLE ===*/}
            <th className="py-5">Serial No</th>
            <th>Name</th>
            <th>RollNo</th>
            <th>Education Type</th>
            <th>Batch</th>
            <th>Availing Bus</th>
            <th>Route</th>
            <th>Amount</th>
            <th>MobileNo</th>
            <th>Fees Paid</th>
          </tr>
          {/* RENDERING DRIVER DATA ON WEBSITE */}
          {students.map((data, index) => (
            <tr className="shadow-sm shadow-gray-400  container">
              <td className="py-5">{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.rollNo}</td>
              <td>{data.eduType}</td>
              <td>{data.batch}</td>
              <td>{data.availingBus}</td>
              <td>{data.route}</td>
              <td>{data.amount}</td>
              <td>{data.mobile}</td>
              <td>{data.paid}</td>
              <td>
                <button
                  className={
                    "px-2 " +
                    (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
                  }
                  onClick={() => {
                    updatestudent(data.id);
                  }}
                >
                  <i class="fa-solid fa-pencil"></i>
                </button>
              </td>
              <td>
                <button
                  className={
                    "px-2 " +
                    (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
                  }
                  onClick={() => {
                    deleteStudent(data.id);
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
          {students.map((data) => (
            <div className="shadow-sm shadow-gray-300 container mx-auto md:hidden px-5 py-5 my-2">
              <p>
                <span className="text-md font-medium text-red-500">No: </span>1
              </p>
              <p>
                <span className="text-md font-medium text-red-500">Name: </span>
                {data.name}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  RollNo:{" "}
                </span>
                {data.rollNo}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Education Type:{" "}
                </span>
                {data.eduType}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Batch:{" "}
                </span>
                {data.batch}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Availing Bus:{" "}
                </span>
                {data.availingBus}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Route:{" "}
                </span>
                {data.route}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Amount:{" "}
                </span>
                {data.amount}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Mobile:{" "}
                </span>
                {data.mobile}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">Fee: </span>
                {data.paid}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
