import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

const Table = () => {
  const [expenses, setExpenses] = useState([]);
  const expenseCollection = collection(db, "Expenses");
  const [userInfo, setUserInfo] = useState();
  const Navigate = useNavigate();

  const getExpenses = async () => {
    const data = await getDocs(expenseCollection);
    setExpenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteExpense = async (id) => {
    const Expensedoc = doc(db, "Expenses", id);
    await deleteDoc(Expensedoc);
    window.location.reload();
  };
  useEffect(() => {
    getExpenses();
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      console.log("executing");
    });
  }, []);
  const updateExpense = (id) => {
    Navigate("/updateExpense/" + id);
  };
  return (
    <div className="md:w-[80%] md:float-right md:px-4 font-abc">
      {/*=== TOP HEADER ===*/}
      <main>
        <div className="flex justify-between container mx-auto mt-6 px-4">
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
      {/*=== EXPENSES ===*/}
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
            className="bg-[rgba(255,153,0,0.2)] border-orange-600 border-2 text-orange-600 px-4 hover:bg-[rgba(255,153,0,0.1)]  py-2 rounded-md mr-4"
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
              <td>
                <input type="checkbox" />
              </td>
              <td className="py-5">{index + 1}</td>
              <td>{data.BusNumber}</td>
              <td>{data.ExpenseType}</td>
              <td>{data.RepairType}</td>
              <td>{data.Driver}</td>
              <td>{data.Date}</td>
              <td>{data.Amount}</td>
              <td>
                <p>file</p>
              </td>
              <td>
                <button
                  className={
                    "px-2 " +
                    (userInfo?.email === "admin@gmail.com" ? "" : "hidden")
                  }
                  onClick={() => {
                    updateExpense(data.id);
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
                    deleteExpense(data.id);
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
          {expenses.map((data) => (
            <div className="shadow-sm shadow-gray-300 container mx-auto md:hidden px-5 py-5 my-2">
              <p>
                <span className="text-md font-medium text-red-500">No: </span>1
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Bus Number:{" "}
                </span>
                {data.BusNumber}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Expense Type:{" "}
                </span>
                {data.ExpenseType}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Repair Type:{" "}
                </span>
                {data.RepairType}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Driver:{" "}
                </span>
                {data.Driver}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">Date: </span>
                {data.Date}
              </p>
              <p>
                <span className="text-md font-medium text-red-500">
                  Amount:{" "}
                </span>
                {data.Amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
