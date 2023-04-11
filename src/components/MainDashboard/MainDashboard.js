import React, { useEffect, useState } from "react";
import Mainnav from "./Mainnav";
import MainBar from "./MainBar";
import BarChart from "./BarChart";
import { Bar } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const MainDashboard = () => {
  const expenseCollection = collection(db, "Expenses");
  const [expenseMonth, setExpenseMonth] = useState([]);
  const getExpenses = async () => {
    const data = await getDocs(expenseCollection);
    const expenseData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // console.log(expenseData);
    //Total Expenses
    var amount = [];
    var sum = 0;
    expenseData.forEach((datas) => {
      sum += Number(datas.Amount);
    });
    amount.push(sum);
    //Expenses by monthly
    var months = [];
    var monthsum = 0;
    var montharr = [];
    expenseData.forEach((data) => {
      var date = data.Date.split("-");
      months.push(date[1]);
      if (date[1] == "04") {
        monthsum += Number(data.Amount);
      }
    });
    montharr.push(monthsum);
    console.log(montharr);
    setExpenseMonth(montharr);
    //SETTING DATA
    setExpenseData({
      labels: months,
      datasets: [
        {
          label: "Expenses",
          data: expenseData.map((data) => data.Amount),
          // data: expenseMonth.map((data) => data),
          borderColor: ["black"],
          backgroundColor: ["	#8A2BE2"],
        },
      ],
    });
    setTotalData({
      labels: ["Total Expenses"],
      datasets: [
        {
          label: "Expenses",
          // data: expenseData.map((data) => data.Amount),
          data: amount,
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
  const [totalData, setTotalData] = useState({ labels: [], datasets: [] });
  return (
    <div>
      <Mainnav />
      <MainBar />
      <div className="md:w-[850px] md:mt-64 px-5 mx-auto container bg-gray-100 rounded-lg">
        <BarChart Chartdata={expenseData} />
        <BarChart Chartdata={totalData} />
      </div>
    </div>
  );
};

export default MainDashboard;
