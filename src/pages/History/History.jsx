import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { TbCheck, TbCheckbox } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import Topbar from "~/components/UI/Topbar";
import { getAllCompleteGoals } from "~/redux/slices/goalsSlice";

const History = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { completedGoals, status } = useSelector((store) => store.goals);

  useEffect(() => {
    dispatch(getAllCompleteGoals({ userID: user.uid }));
  }, [dispatch, user.uid]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="p-6 w-full h-full ">
      <Topbar firstLabel={"Anasayfa"} firstLink={"/"} secondLabel={"Geçmiş"} />

      <div className="flex flex-col gap-4 w-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-semibold text-primary text-lg mb-2 flex gap-x-1 items-center">
            <TbCheckbox size={20} />
            Tamamlanan Hedefler
          </h1>
          <div className="px-4 h-10 rounded-md border flex items-center gap-x-5 bg-white">
            <span>
              <FaSearch />
            </span>
            <input
              placeholder="Ara.."
              className="h-10 bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="relative overflow-x-auto w-full border shadow-md rounded-md p-1">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-zinc-100 font-medium  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Hedef Başlığı
                </th>
                <th scope="col" className="px-6 py-3">
                  Hedef Tutarı
                </th>
                <th scope="col" className="px-6 py-3">
                  Bakiye
                </th>
                <th scope="col" className="px-6 py-3">
                  Son Tarih
                </th>
                <th scope="col" className="px-6 py-3">
                  Tamamlanma Tarihi
                </th>
              </tr>
            </thead>
            <tbody className="rounded-b-2xl">
              {completedGoals.map((goal) => (
                <tr
                  key={goal.id}
                  className="bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {goal.goalTitle}
                  </td>
                  <td className="px-6 py-4">
                    {goal.goalAmount.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    ₺
                  </td>
                  <td className="px-6 py-4">
                    {goal.goalAccount.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    ₺
                  </td>
                  <td className="px-6 py-4">{goal.goalLastDate}</td>
                  <td className="px-6 py-4">{goal.completedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
