import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";

const Expenseform = () => {
  //STORING DATA IN VARIABLES
  const [busNo, setBusNo] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [repairType, setRepairType] = useState("");
  const [driver, setDriver] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const expenseCollection = collection(db, "Expenses");

  // CREATING A NEW DRIVER
  const createExpense = async () => {
    await addDoc(expenseCollection, {
      BusNumber: busNo,
      ExpenseType: expenseType,
      RepairType: repairType,
      Driver: driver,
      Date: date,
      Amount: amount,
    });
  };
  return (
    <div className="md:w-[80%] md:px-4 md:float-right font-abc">
      {/*=== EXPENSE FORM START HERE ===*/}
      <main className="container mx-auto mt-5">
        <h1 className="font-medium text-4xl text-center">
          Expenses Information
        </h1>
        <form className="mt-8 flex flex-col md:space-y-6 container px-4">
          {/* COMBINING TWO INPUT IN FLEX */}
          <div className="flex-col flex md:flex-row justify-around items-center">
            {/*=== BUS NUMBER ===*/}
            <div className="flex flex-col justify-center items-start">
              <label className="font-medium">Bus Number:</label>
              <input
                required
                type="text"
                className="border-gray-300 border-2 rounded-md px-4  md:w-[400px] w-[375px] h-12"
                onChange={(e) => {
                  setBusNo(e.target.value);
                }}
                placeholder="Bus Number"
              />
            </div>
            {/*=== EXPENSE TYPE ===*/}
            <div className="flex flex-col justify-center items-start">
              <label className="font-medium">Expense Type:</label>
              <select
                required
                className="border-gray-300 border-2 rounded-md px-4  md:w-[400px] w-[375px] h-12"
                onChange={(e) => {
                  setExpenseType(e.target.value);
                }}
              >
                <option className="bg-orange-500 text-white">Select</option>
                <option className="bg-orange-500 text-white">Fuel</option>
                <option className="bg-orange-500 text-white">Repair</option>
              </select>
            </div>
          </div>
          {/* COMBINING TWO INPUT IN FLEX */}
          <div className="flex flex-col md:flex-row justify-around items-center">
            {/*=== REPAIR TYPE ===*/}
            <div className="flex flex-col justify-center items-start">
              <label className="font-medium">Repair Type:</label>
              <input
                required
                type="text"
                className="border-gray-300 border-2 rounded-md px-4 md:w-[400px] w-[375px] h-12"
                onChange={(e) => {
                  setRepairType(e.target.value);
                }}
                placeholder="Repair Type"
              />
            </div>
            {/*=== DRIVER ===*/}
            <div className="flex flex-col justify-center items-start">
              <label className="font-medium">Driver:</label>
              <input
                required
                type="text"
                className="border-gray-300 border-2 rounded-md px-4 md:w-[400px] w-[375px] h-12"
                onChange={(e) => {
                  setDriver(e.target.value);
                }}
                placeholder="Driver"
              />
            </div>
          </div>
          {/* COMBINING TWO INPUT IN FLEX */}
          <div className="flex flex-col md:flex-row justify-around items-center">
            {/*=== DATE ===*/}
            <div className="flex flex-col justify-center items-start">
              <label className="font-medium">Date:</label>
              <input
                required
                type="date"
                className="border-gray-300 border-2 rounded-md px-4 md:w-[400px] w-[375px] h-12"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                placeholder="Date"
              />
            </div>
            {/*=== AMOUNT ===*/}
            <div className="flex flex-col justify-center items-start">
              <label className="font-medium">Amount:</label>
              <input
                required
                type="text"
                className="border-gray-300 border-2 rounded-md px-4 md:w-[400px] w-[375px] h-12"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center">
            {/*=== DATE ===*/}
            <div className="flex flex-col justify-center items-center">
              <label className="font-medium">Upload Bill:</label>
              <input
                required
                type="file"
                className="border-gray-300 border-2 rounded-md px-4 md:w-[400px] w-[375px] py-3"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                placeholder="Date"
              />
            </div>
          </div>
        </form>
        {/*=== BACK AND SUBMIT BUTTONS ===*/}
        <div className=" md:text-right space-x-5 md:mt-20 md:mr-32 mt-10 text-center">
          {/*=== BACK BUTTON ===*/}
          <Link
            to="/expense"
            className="bg-gray-200 px-10 text-gray-600 rounded-md py-4"
          >
            Back
          </Link>
          {/*=== SUBMIT BUTTON ===*/}
          <Link
            to="/expense"
            className="bg-orange-400 px-10 text-white py-4 rounded-md"
            onClick={createExpense}
          >
            Submit
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Expenseform;
