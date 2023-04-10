import React, { useEffect, useState } from "react";
import Mainnav from "./Mainnav";
import MainBar from "./MainBar";
import BarChart from "./BarChart";
import { Bar } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const MainDashboard = () => {
  const expenseCollection = collection(db, "Expenses");
  const getExpenses = async () => {
    const data = await getDocs(expenseCollection);
    const expenseData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // console.log(expenseData);
    setExpenseData({
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Expenses",
          data: expenseData.map((data) => data.Amount),
          borderColor: ["black"],
          backgroundColor: ["	#8A2BE2"],
        },
      ],
    });
  };
  useEffect(() => {
    getExpenses();
  }, []);

  const [expenseData, setExpenseData] = useState({ labels: [], datasets: [] });
  return (
    <div>
      <Mainnav />
      <MainBar />
      <div className="md:w-[900px] md:mt-64 px-5 mx-auto container bg-gray-100 rounded-lg ">
        <BarChart Chartdata={expenseData} className="w-[900px]" />
      </div>
    </div>
  );
};

export default MainDashboard;
