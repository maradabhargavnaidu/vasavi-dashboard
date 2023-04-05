import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

const StudentComponent = () => {
  const [students, setStudents] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const studentCollection = collection(db, "Students");
  const Navigate = useNavigate();

  const getStudents = async () => {
    const data = await getDocs(studentCollection);
    setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  //   const deleteStudent = async (id) => {
  //     const Expensedoc = doc(db, "Students", id);
  //     await deleteDoc(Expensedoc);
  //     window.location.reload();
  //   };
  //   const updatestudent = (id) => {
  //     Navigate("/updatestudent/" + id);
  //   };
  useEffect(() => {
    getStudents();
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      console.log("executing");
    });
  }, []);
  const columns = [
    {
      name: "No",
      selector: (row) => row.index,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Roll No",
      selector: (row) => row.rollNo,
    },
    {
      name: "Education Type",
      selector: (row) => row.eduType,
    },
    {
      name: "Batch",
      selector: (row) => row.batch,
    },
    {
      name: "Availing Bus",
      selector: (row) => row.availingBus,
    },
    {
      name: "Route",
      selector: (row) => row.route,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Paid",
      selector: (row) => row.paid,
    },
  ];
  return (
    <>
      <main>
        <div className="flex justify-between container mx-auto mt-6 px-4 float-right md:w-[80%] font-abc">
          {/*=== EXPENSES HEADING ===*/}
          <h1 className="md:text-4xl text-xl font-semibold text-[#353c4e]">
            Students
          </h1>
          {/*=== NAVIGATES TO EXPENSES BASIC INFORMATION PAGE ===*/}
          <Link
            to="/expense/create-expense"
            className={
              "bg-[rgba(0,255,0,0.2)] text-green-600 hover:bg-[rgba(0,255,0,0.1)] border-green-600 border-2 px-4 py-2 rounded-md " +
              (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
          >
            New Student +
          </Link>
        </div>
      </main>
      <div className="mt-16 container mx-auto float-right md:w-[80%] font-abc">
        <div className="shadow-sm shadow-gray-400 flex justify-between py-5 container w-full mx-auto">
          <div>
            {/*=== TABLE SEARCH BAR ===*/}
            <input
              type="text"
              placeholder="Search"
              className="border-gray-200 border-2 rounded-md p-2 ml-4 w-36 md:w-60"
            />
            {/* <i class="fa-solid fa-magnifying-glass ml-5"></i> */}
          </div>
          {/*=== DOWNLOAD REPORT BUTTON ===*/}
          <Link
            to="/"
            className="bg-[rgba(255,153,0,0.2)] border-orange-600 border-2 text-orange-600 px-4 hover:bg-[rgba(255,153,0,0.1)]  py-2 rounded-md mr-4"
          >
            Download Report <i class="fa-solid fa-download"></i>
          </Link>
        </div>
      </div>
      <div className="container mx-auto md:w-[80%] float-right">
        <DataTable
          className=""
          columns={columns}
          data={students}
          selectableRows
          fixedHeader
        ></DataTable>
      </div>
    </>
  );
};

export default StudentComponent;
