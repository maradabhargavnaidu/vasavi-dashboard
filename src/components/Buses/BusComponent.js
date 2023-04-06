import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { DownloadTableExcel } from "react-export-table-to-excel";

const BusComponent = () => {
  const [buses, setBuses] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const busCollection = collection(db, "Buses");
  const tableRef = useRef(null);
  const Navigate = useNavigate();
  const getBuses = async () => {
    const data = await getDocs(busCollection);
    setBuses(
      data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, index }))
    );
  };
  const columns = [
    {
      name: "NO",
      selector: (row) => row.index + 1,
      sortable: true,
    },
    {
      name: "BusNo",
      selector: (row) => row.busNo,
      sortable: true,
    },
    {
      name: "RegistrationNo",
      selector: (row) => row.RegistrationNo,
      sortable: true,
    },
    {
      name: "Route",
      selector: (row) => row.route,
      sortable: true,
    },
    {
      name: "Bus Condition",
      selector: (row) => row.busCondition,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            onClick={() => update(row.id)}
            className={
              "px-1 " + (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button
            className={
              "px-1 " + (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
            onClick={() => {
              deleteBus(row.id);
            }}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

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
    <>
      <main>
        <div className="flex justify-between container mx-auto mt-6 px-4 float-right md:w-[80%] font-abc">
          {/*=== EXPENSES HEADING ===*/}
          <h1 className="md:text-4xl text-xl font-semibold text-[#353c4e]">
            Buses
          </h1>
          {/*=== NAVIGATES TO EXPENSES BASIC INFORMATION PAGE ===*/}
          <Link
            to="/expense/create-expense"
            className={
              "bg-[rgba(0,255,0,0.2)] text-green-600 hover:bg-[rgba(0,255,0,0.1)] border-green-600 border-2 px-4 py-2 rounded-md " +
              (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
          >
            New Bus +
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
            filename="Buses Table"
            sheet="Buses"
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
          data={buses}
          selectableRows
          fixedHeader
          pagination
        ></DataTable>
      </div>
      <table className="hidden" ref={tableRef}>
        <tr>
          {/*=== HEADING OF TABLE ===*/}
          <th className="py-5">Serial No</th>
          <th>Bus Number</th>
          <th>Registration Number</th>
          <th>Route</th>
          <th>Bus Condition</th>
        </tr>
        {/* RENDERING DRIVER DATA ON WEBSITE */}
        {buses.map((data, index) => (
          <tr>
            <td className="py-5">{index + 1}</td>
            <td>{data.busNo}</td>
            <td>{data.RegistrationNo}</td>
            <td>{data.route}</td>
            <td>{data.busCondition}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default BusComponent;
