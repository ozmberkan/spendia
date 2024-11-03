import React, { useEffect, useState } from "react";
import { FaRegFileExcel, FaSearch } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import ExpensesAddModal from "~/components/UI/Modals/ExpensesAddModal";
import Topbar from "~/components/UI/Topbar";
import { getAllExpenses } from "~/redux/slices/budgetsSlice";
import * as XLSX from "xlsx";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import ExpensesEditModal from "~/components/UI/Modals/ExpensesEditModal";

const Expenses = () => {
  const { expenses, status } = useSelector((store) => store.budgets);

  const [isExpensesAddModal, setIsExpensesAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useSelector((store) => store.user);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedExpenses, setSelectedExpenses] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExpenses({ userID: user.uid }));
  }, []);

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

  const deleteExpenses = async (id) => {
    try {
      if (confirm("Gideri silmek istediğinize emin misiniz?")) {
        const expensesRef = doc(db, "expenses", id);
        await deleteDoc(expensesRef);
        toast.success("Gider başarıyla silindi.");
        dispatch(getAllExpenses({ userID: user.uid }));
      } else {
        toast.error("Gider silme işlemi iptal edildi.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredExpenses = expenses.filter((expenses) => {
    const matchesSearch =
      `${expenses.expensesName} ${expenses.expensesAmount} ${expenses.createdAt}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesFilter = filter === "" || expenses.expensesType === filter;
    return matchesSearch && matchesFilter;
  });

  const updateExpenses = (expenses) => {
    setIsEdit(true);
    setSelectedExpenses(expenses);
  };

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
      <div className="p-6 w-full h-full ">
        <div className="flex justify-between items-center">
          <Topbar
            firstLabel={"Anasayfa"}
            firstLink={"/"}
            secondLabel={"Giderlerim"}
          />
        </div>
        <div className="flex gap-x-5 items-center w-full justify-between ">
          <button
            onClick={handleExcelExport}
            className="bg-[#147E47] px-4 py-2 text-sm rounded-md text-white font-medium flex gap-x-1 items-center"
          >
            <FaRegFileExcel size={20} /> Excel
          </button>
          <div className="flex gap-x-4 items-center ">
            <div className="flex items-center px-4 gap-x-4 h-10 rounded-md border">
              <label className="text-zinc-500">
                <FaSearch />
              </label>
              <input
                type="text"
                className="outline-none h-full"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Ara..."
              />
            </div>
            <div className="flex items-center px-4 gap-x-4 h-10 rounded-md border">
              <select
                type="text"
                className="outline-none h-full"
                placeholder="Ara..."
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Hepsi</option>
                <option value="regular">Düzenli</option>
                <option value="irregular">Düzensiz</option>
              </select>
            </div>
            <button
              onClick={() => setIsExpensesAddModal(true)}
              className="px-4 py-2 rounded-md bg-primary text-secondary font-medium text-sm flex gap-x-1 items-center "
            >
              <MdAdd size={20} />
              Ekle
            </button>
          </div>
        </div>
        <div className="w-full flex justify-start items-start flex-col gap-x-5 gap-y-5 mt-6 ">
          <div className="relative overflow-x-auto w-full border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                        onClick={() => deleteExpenses(expense.expensesID)}
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
      </div>
    </>
  );
};

export default Expenses;
