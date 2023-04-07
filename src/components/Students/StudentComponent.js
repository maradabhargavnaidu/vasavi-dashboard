import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import * as XLSX from "xlsx";
import styled, { keyframes } from "styled-components";

const StudentComponent = () => {
  // STORING STUDENTS DATA
  const [students, setStudents] = useState([]);
  // SEARCH DATA
  const [search, setSearch] = useState();
  // IF THERE IS DATA IN SEARCH IT WILL SET TO TRUE
  const [data, setData] = useState(false);
  // STORING STUDENTS DATA TO EXPORT IN EXCEL
  const [excelData, setExcelData] = useState([]);
  // SETTING USERINFORMATION
  const [userInfo, setUserInfo] = useState();
  // LOADER
  const [pending, setPending] = useState(true);
  // CONNECTING TO STUDENTS TABLE IN FIREBASE
  const studentCollection = collection(db, "Students");
  // TO NAVIGATE
  const Navigate = useNavigate();
  // FUNCTION TO GET STUDENTS DATA
  const getStudents = async () => {
    const data = await getDocs(studentCollection);
    setStudents(
      data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, index }))
    );
    setExcelData(data.docs.map((doc) => ({ ...doc.data() })));
    setPending(false);
  };
  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Spinner />
    </div>
  );
  const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
 }

  to {
    transform: rotate(360deg);  }
`;

  const Spinner = styled.div`
    margin: 16px;
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);
    border-top: 2px solid grey;
    border-right: 2px solid grey;
    border-bottom: 2px solid grey;
    border-left: 4px solid black;
    background: transparent;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  `;
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
  ];
  // FUNCTION TO DELETE STUDENT DATA
  const deleteStudent = async (id) => {
    const Expensedoc = doc(db, "Students", id);
    await deleteDoc(Expensedoc);
    window.location.reload();
  };
  // FUNCTION TO UPDATE STUDENTS DATA
  const updatestudent = (id) => {
    Navigate("/updatestudent/" + id);
  };
  // SIDE EFFECTS
  useEffect(() => {
    getStudents();
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      console.log("executing");
    });
  }, []);
  // EXPORTING JSON DATA TO EXCEL
  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "Students.xlsx");
  };
  // ADMIN ACTIONS
  if (userInfo?.email === "admin@gmail.com") {
    columns.push({
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="px-2 "
            onClick={() => {
              updatestudent(row.id);
            }}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button
            className="px-2 "
            onClick={() => {
              deleteStudent(row.id);
            }}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    });
  }
  // FILTER FUNCTION
  const Filter = (e) => {
    const newData = students.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
    setData(true);
  };
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
            to="/students/createstudent"
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
              onChange={Filter}
              type="text"
              placeholder="Search"
              className="border-gray-200 border-2 rounded-md p-2 ml-4 w-36 md:w-60"
            />
          </div>
          {/*=== DOWNLOAD REPORT BUTTON ===*/}
          <button
            onClick={() => downloadExcel(excelData)}
            className="bg-[rgba(255,153,0,0.2)] border-orange-600 border-2 text-orange-600 px-4 hover:bg-[rgba(255,153,0,0.1)]  py-2 rounded-md mr-4"
          >
            Download Report <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
      <div className="container mx-auto md:w-[80%] float-right">
        <DataTable
          columns={columns}
          data={data ? search : students}
          selectableRows
          fixedHeader
          pagination
          progressPending={pending}
          progressComponent={<CustomLoader />}
        ></DataTable>
      </div>
    </>
  );
};

export default StudentComponent;
