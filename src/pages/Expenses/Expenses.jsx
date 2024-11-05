import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import ExpensesAddModal from "~/components/UI/Modals/ExpensesAddModal";
import Topbar from "~/components/UI/Topbar";
import { getAllExpenses } from "~/redux/slices/budgetsSlice";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { FaRegFileExcel, FaSearch } from "react-icons/fa";
import ExpensesEditModal from "~/components/UI/Modals/ExpensesEditModal";
import { TiEdit } from "react-icons/ti";
import { TbTrash } from "react-icons/tb";
import { MdAdd } from "react-icons/md";

const Expenses = () => {
  const { expenses, status } = useSelector((store) => store.budgets);
  const { user } = useSelector((store) => store.user);
  const [isExpensesAddModal, setIsExpensesAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExpenses({ userID: user.uid }));
  }, [dispatch, user.uid]);

  if (status === "loading") {
    return <Loader />;
  }

  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      expenses.map((expense) => ({
        "Gider Adı": expense.expensesName,
        Tipi: expense.expensesType === "regular" ? "Düzenli" : "Düzensiz",
        Tutar: expense.expensesAmount,
        Tarih: expense.createdAt,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Giderler");
    XLSX.writeFile(workbook, "giderler.xlsx");
  };

  const deleteExpenses = async (expense) => {
    try {
      const confirm = window.confirm(
        "Gideri silmek istediğinize emin misiniz?"
      );
      if (confirm) {
        const expensesRef = doc(db, "expenses", expense.expensesID);
        const userRef = doc(db, "users", user.uid);
        await deleteDoc(expensesRef);

        await updateDoc(userRef, {
          currentBudget: user.currentBudget + expense.expensesAmount,
        });

        toast.success("Gider başarıyla silindi.");
        dispatch(getAllExpenses({ userID: user.uid }));
      } else {
        toast.error("Gider silme işlemi iptal edildi.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateExpenses = (expense) => {
    setIsEdit(true);
    setSelectedExpenses(expense);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      `${expense.expensesName} ${expense.expensesAmount} ${expense.createdAt}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesFilter = filter === "" || expense.expensesType === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {isExpensesAddModal && (
        <ExpensesAddModal setIsExpensesAddModal={setIsExpensesAddModal} />
      )}
      {isEdit && (
        <ExpensesEditModal
          setIsEdit={setIsEdit}
          selectedExpenses={selectedExpenses}
        />
      )}
      <div className="p-6 w-full h-full">
        <div className="flex justify-between items-center mb-4">
          <Topbar
            firstLabel="Anasayfa"
            firstLink="/"
            secondLabel="Giderlerim"
          />
        </div>
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <button
            onClick={handleExcelExport}
            className="bg-[#147E47] lg:w-auto w-full px-4 py-2 text-sm rounded-md text-white font-medium flex gap-x-1 items-center"
          >
            <FaRegFileExcel size={20} /> <span>Excel</span>
          </button>
          <div className="flex-grow flex gap-x-4 items-center">
            <div className="flex items-center px-4 gap-x-4 h-10 rounded-md border w-full">
              <label className="text-zinc-500">
                <FaSearch />
              </label>
              <input
                type="text"
                className="outline-none h-full w-full"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Ara..."
              />
            </div>
            <div className="flex items-center px-4 gap-x-4 h-10 rounded-md border w-full">
              <select
                className="outline-none h-full w-full bg-transparent"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Hepsi</option>
                <option value="regular">Düzenli</option>
                <option value="irregular">Düzensiz</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setIsExpensesAddModal(true)}
            className="px-4 py-2 w-full lg:w-auto rounded-md bg-primary text-secondary font-medium text-sm flex gap-x-1 items-center"
          >
            <MdAdd size={20} />
            Ekle
          </button>
        </div>
        <div className="w-full mt-6 overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Gider Adı
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
                <th scope="col" className="px-6 py-3">
                  Aksiyon
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr
                  key={expense.expensesID}
                  className="bg-white border-b dark:bg-gray-800"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {expense.expensesName}
                  </th>
                  <td className="px-6 py-4">
                    {expense.expensesType === "regular"
                      ? "Düzenli"
                      : "Düzensiz"}
                  </td>
                  <td className="px-6 py-4">
                    {expense.expensesAmount.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    ₺
                  </td>
                  <td className="px-6 py-4">{expense.createdAt}</td>
                  <td className="px-6 py-4 flex items-center gap-x-2">
                    <button
                      onClick={() => deleteExpenses(expense)}
                      className="bg-red-100 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-md px-4 py-2"
                    >
                      <TbTrash size={20} />
                    </button>
                    <button
                      onClick={() => updateExpenses(expense)}
                      className="bg-blue-100 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors rounded-md px-4 py-2"
                    >
                      <TiEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Expenses;
