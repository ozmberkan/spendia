import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import IncomeAddModal from "~/components/UI/Modals/IncomeAddModal";
import Topbar from "~/components/UI/Topbar";
import { getAllIncomes } from "~/redux/slices/budgetsSlice";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { FaRegFileExcel, FaSearch } from "react-icons/fa";
import IncomeEditModal from "~/components/UI/Modals/IncomeEditModal";
import { TiEdit } from "react-icons/ti";
import { TbTrash } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Incomes = () => {
  const { incomes, status } = useSelector((store) => store.budgets);
  const { user } = useSelector((store) => store.user);
  const [isIncomeModal, setIsIncomeModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIncomes({ userID: user.uid }));
  }, []);

  if (status === "loading") {
    return <Loader />;
  }

  const deleteIncome = async (income) => {
    try {
      const confirm = window.confirm(
        "Geliri silmek istediğinize emin misiniz?"
      );
      if (confirm) {
        const incomeRef = doc(db, "incomes", income.incomeID);
        const userRef = doc(db, "users", user.uid);
        await deleteDoc(incomeRef);

        await updateDoc(userRef, {
          currentBudget: user.currentBudget - income.incomeAmount,
        });

        toast.success("Gelir başarıyla silindi.");
        dispatch(getAllIncomes({ userID: user.uid }));
      } else {
        toast.error("Gelir silme işlemi iptal edildi.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      incomes.map((income) => ({
        "Gelir Adı": income.incomeName,
        Tipi: income.incomeType === "regular" ? "Düzenli" : "Düzensiz",
        Tutar: income.incomeAmount,
        Tarih: income.createdAt,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gelirler");
    XLSX.writeFile(workbook, "gelirler.xlsx");
  };

  const updateIncome = (income) => {
    setIsEdit(true);
    setSelectedIncome(income);
  };

  const filteredIncomes = incomes.filter((income) => {
    const matchesSearch =
      `${income.incomeName} ${income.incomeAmount} ${income.createdAt}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesFilter = filter === "" || income.incomeType === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {isIncomeModal && <IncomeAddModal setIsIncomeModal={setIsIncomeModal} />}
      {isEdit && (
        <IncomeEditModal
          setIsEdit={setIsEdit}
          selectedIncome={selectedIncome}
        />
      )}
      <div className="p-6 w-full h-full ">
        <div className="flex justify-between items-center">
          <Topbar
            firstLabel={"Anasayfa"}
            firstLink={"/"}
            secondLabel={"Gelirlerim"}
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
              onClick={() => setIsIncomeModal(true)}
              className="px-4 py-2 rounded-md bg-primary text-secondary font-medium text-sm flex gap-x-1 items-center "
            >
              <MdAdd size={20} />
              Ekle
            </button>
          </div>
        </div>
        <div className="w-full flex justify-start items-start flex-col gap-x-5 gap-y-5 mt-6 ">
          <div className="w-full border">
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
                  <th scope="col" className="px-6 py-3">
                    Aksiyon
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIncomes.map((income) => (
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
                    <td className="px-6 py-4 flex items-center gap-x-2">
                      <button
                        onClick={() => deleteIncome(income)}
                        className="bg-red-100 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-md px-4 py-2"
                      >
                        <TbTrash size={20} />
                      </button>
                      <button
                        onClick={() => updateIncome(income)}
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

export default Incomes;
