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
    console.log(expenseData);
    setExpenseData({
      labels: expenseData.map((data) => data.Amount),
      datasets: [
        {
          label: "Expenses",
          data: expenseData.map((data) => data.Amount),
          backgroundColor: ["lightgreen", "orange"],
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
      <div className="w-[900px] mt-64 px-5 mx-auto">
        <BarChart Chartdata={expenseData} className="w-[900px]" />
      </div>
    </div>
  );
};

export default MainDashboard;
