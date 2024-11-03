import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import Topbar from "~/components/UI/Topbar";
import { getAllIncomes } from "~/redux/slices/budgetsSlice";

const Incomes = () => {
  const { incomes, status } = useSelector((store) => store.budgets);
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIncomes({ userID: user.uid }));
  }, []);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="p-6 w-full h-full ">
      <Topbar
        firstLabel={"Anasayfa"}
        firstLink={"/"}
        secondLabel={"Gelirlerim"}
      />
      <div className="w-full flex justify-start items-start flex-col gap-x-5 gap-y-5 ">
        <div className="relative overflow-x-auto w-full border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Gelir Adı
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipi
                </th>
                <th scope="col" className="px-6 py-3">
                  Tutar
                </th>
                <th scope="col" className="px-6 py-3">
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income) => (
                <tr
                  key={income.incomeID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {income.incomeName}
                  </th>
                  <td className="px-6 py-4">
                    {income.incomeType === "regular" ? "Düzenli" : "Düzensiz"}
                  </td>
                  <td className="px-6 py-4">
                    {income.incomeAmount.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    ₺
                  </td>
                  <td className="px-6 py-4">{income.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Incomes;
