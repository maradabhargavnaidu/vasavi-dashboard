import React, { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../../firebase-config";

const MainBar = () => {
  const [Loading, setLoading] = useState(false);
  const [buscount, setBusCount] = useState("");
  const [drivercount, setDrivercount] = useState("");
  const [studentcount, setStudentcount] = useState("");
  const [expensecount, setExpensecount] = useState("");
  const busCollection = collection(db, "Buses");
  const driverCollection = collection(db, "Drivers");
  const studentCollection = collection(db, "Students");
  const expenseCollection = collection(db, "Expenses");
  const getExpensecount = async () => {
    setLoading(true);
    const expensecount = await getCountFromServer(expenseCollection);
    setExpensecount(expensecount.data().count);
    setLoading(false);
  };
  const getStudentcount = async () => {
    const studentscount = await getCountFromServer(studentCollection);
    setStudentcount(studentscount.data().count);
  };
  const getDrivercount = async () => {
    const driverscount = await getCountFromServer(driverCollection);
    setDrivercount(driverscount.data().count);
  };
  const getBuscount = async () => {
    const busescounts = await getCountFromServer(busCollection);
    setBusCount(busescounts.data().count);
  };
  useEffect(() => {
    getBuscount();
    getDrivercount();
    getStudentcount();
    getExpensecount();
  }, []);
  return (
    <div>
      <div>
        <div className="flex flex-col px-5 md:px-0 md:items-start justify-between md:flex-row md:justify-around md:w-[80%] md:float-right mt-10 container h-[600px] md:h-0 font-abc">
          <div className="md:w-64 rounded-md shadow-sm shadow-gray-600">
            <div className="flex items-center justify-between  px-4 py-4">
              <div>
                <h3 className="text-3xl text-[#fe9365] font-medium">
                  {Loading ? <p className="text-sm">Loading...</p> : ""}
                  {buscount}
                </h3>
                <h6 className="text-gray-400">Buses</h6>
              </div>
              <i class="fa-solid fa-signal"></i>
            </div>
            <div className="flex bg-[#FE9365] justify-between px-4 py-3 items-center">
              <h3 className="text-gray-100 font-medium">Total Buses</h3>
              <i class="fa-solid fa-arrow-trend-up text-white"></i>
            </div>
          </div>
          <div className="md:w-64 shadow-sm shadow-gray-600">
            <div className="flex items-center justify-between  px-4 py-4">
              <div>
                <h3 className="text-3xl text-[#0ac282] font-medium">
                  {Loading ? <p className="text-sm">Loading...</p> : ""}
                  {expensecount}
                </h3>
                <h6 className="text-gray-400">Expenses</h6>
              </div>
              <i class="fa-solid fa-sheet-plastic"></i>
            </div>
            <div className="flex bg-[#0AC282] justify-between px-4 py-3 items-center">
              <h3 className="text-gray-100 font-medium">Total Expenses</h3>
              <i class="fa-solid fa-arrow-trend-up text-white"></i>
            </div>
          </div>
          <div className="md:w-64 shadow-sm shadow-gray-600">
            <div className="flex items-center justify-between  px-4 py-4">
              <div>
                <h3 className="text-3xl text-[#eb3422] font-medium">
                  {Loading ? <p className="text-sm">Loading...</p> : ""}
                  {studentcount}
                </h3>
                <h6 className="text-gray-400">Students</h6>
              </div>
              <i class="fa-solid fa-calendar-days"></i>
            </div>
            <div className="flex bg-[#EB3422] justify-between px-4 py-3 items-center">
              <h3 className="text-gray-100 font-medium">Total Students</h3>
              <i class="fa-solid fa-arrow-trend-up text-white"></i>
            </div>
          </div>
          <div className="md:w-64 shadow-sm shadow-gray-600">
            <div className="flex items-center justify-between  px-4 py-4">
              <div>
                <h3 className="text-3xl text-[#01a9ac] font-medium">
                  {Loading ? <p className="text-sm">Loading...</p> : ""}
                  {drivercount}
                </h3>
                <h6 className="text-gray-400">Drivers</h6>
              </div>
              <i class="fa-solid fa-download"></i>
            </div>
            <div className="flex bg-[#01A9AC] justify-between px-4 py-3 items-center">
              <h3 className="text-gray-100 font-medium">Total Drivers</h3>
              <i class="fa-solid fa-arrow-trend-up text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBar;
