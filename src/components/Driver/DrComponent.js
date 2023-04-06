import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { DownloadTableExcel } from "react-export-table-to-excel";

const DrComponent = () => {
  const Navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const driverCollection = collection(db, "Drivers");
  const [userInfo, setUserInfo] = useState();
  const tableRef = useRef(null);
  const deleteDriver = async (id) => {
    const driverdoc = doc(db, "Drivers", id);
    await deleteDoc(driverdoc);
    window.location.reload();
  };

  const columns = [
    {
      name: "No",
      selector: (row) => row.index + 1,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "LicenseNo",
      selector: (row) => row.licenseNo,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className={
              "px-1 " + (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
            onClick={() => {
              updatedriver(row.id);
            }}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button
            className={
              "px-1 " + (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
            onClick={() => {
              deleteDriver(row.id);
            }}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const getDrivers = async () => {
    const data = await getDocs(driverCollection);
    setDrivers(
      data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, index }))
    );
  };
  const updatedriver = (id) => {
    Navigate("/updatedriver/" + id);
  };

  useEffect(() => {
    getDrivers();
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
    });
  }, []);

  return (
    <>
      <main>
        <div className="flex justify-between container mx-auto mt-6 px-4 float-right md:w-[80%] font-abc">
          {/*=== EXPENSES HEADING ===*/}
          <h1 className="md:text-4xl text-xl font-semibold text-[#353c4e]">
            Drivers
          </h1>
          {/*=== NAVIGATES TO EXPENSES BASIC INFORMATION PAGE ===*/}
          <Link
            to="/expense/create-expense"
            className={
              "bg-[rgba(0,255,0,0.2)] text-green-600 hover:bg-[rgba(0,255,0,0.1)] border-green-600 border-2 px-4 py-2 rounded-md " +
              (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
          >
            New Driver +
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
          <DownloadTableExcel
            filename="Drivers Table"
            sheet="Drivers"
            currentTableRef={tableRef.current}
          >
            <button className="bg-[rgba(255,153,0,0.2)] border-orange-600 border-2 text-orange-600 px-4 hover:bg-[rgba(255,153,0,0.1)]  py-2 rounded-md mr-4">
              Download Report <i class="fa-solid fa-download"></i>
            </button>
          </DownloadTableExcel>
        </div>
      </div>
      {/* TABLE */}
      <div className="container mx-auto md:w-[80%] float-right">
        <DataTable
          columns={columns}
          data={drivers}
          selectableRows
          fixedHeader
          pagination
        ></DataTable>
      </div>
      {/* DATA TO DOWNLOAD IN EXCEL SHEET */}
      <table className="hidden" ref={tableRef}>
        <tr>
          {/*=== HEADING OF TABLE ===*/}
          <th>Serial No</th>
          <th>Full Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Phone</th>
          <th>License No</th>
          <th>Address</th>
        </tr>
        {/* RENDERING DRIVER DATA ON WEBSITE */}
        {drivers.map((data, index) => (
          <tr>
            <td className="py-5">{index + 1}</td>
            <td>{data.fullName}</td>
            <td>{data.gender}</td>
            <td>{data.age}</td>
            <td>{data.phone}</td>
            <td>{data.licenseNo}</td>
            <td>{data.address}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default DrComponent;
