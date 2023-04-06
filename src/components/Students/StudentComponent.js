import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { DownloadTableExcel } from "react-export-table-to-excel";

const StudentComponent = () => {
  const [students, setStudents] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const studentCollection = collection(db, "Students");
  const tableRef = useRef(null);
  const Navigate = useNavigate();
  const getStudents = async () => {
    const data = await getDocs(studentCollection);
    setStudents(
      data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, index }))
    );
  };
  const columns = [
    {
      name: "No",
      selector: (row) => row.index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Roll No",
      selector: (row) => row.rollNo,
      sortable: true,
    },
    {
      name: "Education Type",
      selector: (row) => row.eduType,
      sortable: true,
    },
    {
      name: "Batch",
      selector: (row) => row.batch,
      sortable: true,
    },
    {
      name: "Availing Bus",
      selector: (row) => row.availingBus,
      sortable: true,
    },
    {
      name: "Route",
      selector: (row) => row.route,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Paid",
      selector: (row) => row.paid,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className={
              "px-2 " + (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
            onClick={() => {
              updatestudent(row.id);
            }}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button
            className={
              "px-2 " + (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
            onClick={() => {
              deleteStudent(row.id);
            }}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

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
          </div>
          {/*=== DOWNLOAD REPORT BUTTON ===*/}
          <DownloadTableExcel
            filename="Student Table"
            sheet="Students"
            currentTableRef={tableRef.current}
          >
            <button className="bg-[rgba(255,153,0,0.2)] border-orange-600 border-2 text-orange-600 px-4 hover:bg-[rgba(255,153,0,0.1)]  py-2 rounded-md mr-4">
              Download Report <i class="fa-solid fa-download"></i>
            </button>
          </DownloadTableExcel>
        </div>
      </div>
      <div className="container mx-auto md:w-[80%] float-right">
        <DataTable
          columns={columns}
          data={students}
          selectableRows
          fixedHeader
          pagination
        ></DataTable>
      </div>
      {/* DOWNLOADING TABLE IN EXCEL SHEET */}
      <table className="hidden" ref={tableRef}>
        <tr>
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
          <tr>
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
          </tr>
        ))}
      </table>
    </>
  );
};

export default StudentComponent;
