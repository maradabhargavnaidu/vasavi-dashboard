import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import * as XLSX from "xlsx";
import styled, { keyframes } from "styled-components";

const ComponentTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const tableRef = useRef(null);
  const [pending, setPending] = useState(true);
  const Navigate = useNavigate();
  const deleteExpense = async (id) => {
    const Expensedoc = doc(db, "Expenses", id);
    await deleteDoc(Expensedoc);
    window.location.reload();
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
      name: "BusNo",
      selector: (row) => row.BusNumber,
      sortable: true,
    },
    {
      name: "Expense Type",
      selector: (row) => row.ExpenseType,
      sortable: true,
    },
    {
      name: "Repair Type",
      selector: (row) => row.RepairType,
      sortable: true,
    },
    {
      name: "Driver",
      selector: (row) => row.Driver,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.Amount,
      sortable: true,
    },
    {
      name: "Upload Bill",
      selector: (row) => row.Bill,
      sortable: true,
    },
  ];

  const expenseCollection = collection(db, "Expenses");
  const updateExpense = (id) => {
    Navigate("/updateExpense/" + id);
  };

  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };
  const getExpenses = async () => {
    const data = await getDocs(expenseCollection);
    setExpenses(
      data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, index }))
    );
    setExcelData(data.docs.map((doc) => ({ ...doc.data() })));
    setPending(false);
  };
  useEffect(() => {
    getExpenses();
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      console.log("executing");
    });
  }, []);
  //ADMIN ACTIONS
  if (userInfo?.email === "admin@gmail.com") {
    columns.push({
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="px-2 "
            onClick={() => {
              updateExpense(row.id);
            }}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button
            className="px-2 "
            onClick={() => {
              deleteExpense(row.id);
            }}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    });
  }

  return (
    <>
      <main>
        <div className="flex justify-between container mx-auto mt-6 px-4 float-right md:w-[80%] font-abc">
          {/*=== EXPENSES HEADING ===*/}
          <h1 className="md:text-4xl text-xl font-semibold text-[#353c4e]">
            Expenses
          </h1>
          {/*=== NAVIGATES TO EXPENSES BASIC INFORMATION PAGE ===*/}
          <Link
            to="/expense/create-expense"
            className={
              "bg-[rgba(0,255,0,0.2)] text-green-600 hover:bg-[rgba(0,255,0,0.1)] border-green-600 border-2 px-4 py-2 rounded-md " +
              (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
            }
          >
            Create Expense +
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
          data={expenses}
          selectableRows
          fixedHeader
          pagination
          progressPending={pending}
          progressComponent={<CustomLoader />}
        ></DataTable>
      </div>

      <table className="hidden" ref={tableRef}>
        <tr>
          {/*=== HEADING OF TABLE ===*/}
          <th className="py-5">Serial No</th>
          <th>Bus Number</th>
          <th>Expense Type</th>
          <th>Repair Type</th>
          <th>Driver</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Upload Bill</th>
        </tr>
        {/* RENDERING DRIVER DATA ON WEBSITE */}
        {expenses.map((data, index) => (
          <tr className="shadow-sm shadow-gray-400  container">
            <td>{index + 1}</td>
            <td>{data.BusNumber}</td>
            <td>{data.ExpenseType}</td>
            <td>{data.RepairType}</td>
            <td>{data.Driver}</td>
            <td>{data.Date}</td>
            <td>{data.Amount}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default ComponentTable;
