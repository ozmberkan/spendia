import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "~/components/UI/Topbar";
import Income from "./Income/Income";
import Expenses from "./Expenses/Expenses";
import { getAllExpenses, getAllIncomes } from "~/redux/slices/budgetsSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Loader from "~/components/UI/Loader";

const Budget = () => {
  const { user } = useSelector((store) => store.user);
  const [animationParent] = useAutoAnimate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { incomes, expenses } = useSelector((store) => store.budgets);

  useEffect(() => {
    dispatch(getAllExpenses({ userID: user.uid }));
    dispatch(getAllIncomes({ userID: user.uid }));

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch, user.uid]);

  if (loading) {
    return <Loader />;
  }

  const totalIncome = incomes
    .map((income) => income.incomeAmount)
    .reduce((acc, amount) => acc + amount, 0);

  // Toplam gideri hesapla
  const totalExpense = expenses
    .map((expense) => expense.expensesAmount)
    .reduce((acc, amount) => acc + amount, 0);

  const netProfit = totalIncome - totalExpense;

  return (
    <div className="p-6 w-full h-full ">
      <Topbar firstLabel={"Anasayfa"} firstLink={"/"} secondLabel={"Bütçe"} />

      <div className="text-xl font-semibold my-4  flex justify-between items-center">
        <div>
          {netProfit >= 0 ? "Kâr: " : "Zarar: "}
          {netProfit === 0 && "Kâr / Zarar Durumu Mevcut Değil - "}
          {Math.abs(netProfit)}
        </div>
        <div>{user.budget}</div>
      </div>

      <div className="w-full flex justify-between items-start ">
        <Income />
        <div className="p-2 flex gap-x-5 flex-1 mx-5 justify-between items-start">
          <div className="border p-3 rounded-md flex flex-col gap-2 ">
            <h1 className="font-medium text-primary pb-1 border-b w-full">
              Gelirler
            </h1>
            <div ref={animationParent} className="flex flex-col gap-3">
              {incomes.map((income) => (
                <div
                  key={income.incomeID}
                  className="flex flex-col border rounded-md px-4 py-2 bg-green-100 border-green-500 text-green-500 min-w-[200px]"
                >
                  <span>{income.incomeName}</span>
                  <span>{income.incomeAmount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border p-3 rounded-md flex flex-col gap-2 ">
            <h1 className="font-medium text-primary pb-1 border-b w-full">
              Giderler
            </h1>
            <div ref={animationParent} className="flex flex-col gap-3">
              {expenses.map((expense) => (
                <div
                  key={expense.expensesID}
                  className="flex flex-col border rounded-md px-4 py-2 bg-red-100 border-red-500 text-red-500 min-w-[200px]"
                >
                  <span>{expense.expensesName}</span>
                  <span>{expense.expensesAmount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Expenses />
      </div>
    </div>
  );
};

export default Budget;
