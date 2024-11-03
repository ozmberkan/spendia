import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import moment from "moment";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { db } from "~/firebase/firebase";
import { getAllExpenses } from "~/redux/slices/budgetsSlice";

const ExpensesEditModal = ({ setIsEdit, selectedExpenses }) => {
  const modalRoot = document.getElementById("modal");

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      expensesType: selectedExpenses.expensesType,
      expensesName: selectedExpenses.expensesName,
      expensesAmount: selectedExpenses.expensesAmount,
    },
  });

  const editExpenses = async (data) => {
    try {
      const expensesRef = doc(db, "expenses", selectedExpenses.expensesID);
      await updateDoc(expensesRef, {
        expensesType: data.expensesType,
        expensesName: data.expensesName,
        expensesAmount: Number(data.expensesAmount),
        updatedAt: moment().format(),
      });

      toast.success("Gider başarıyla düzenlendi.");
      dispatch(getAllExpenses({ userID: user.uid }));
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Gelir Düzenle</h2>
          <button
            onClick={() => setIsEdit(false)}
            className=" text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>
        <form
          className="grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(editExpenses)}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gelir Tipi</label>
            <select
              className="outline-none w-full h-10 bg-transparent border px-4 rounded-md"
              defaultValue={selectedExpenses.expensesType}
              {...register("expensesType")}
            >
              <option value="">Seçiniz..</option>
              <option value="regular">Düzenli</option>
              <option value="irregular">Düzensiz</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gelir Adı</label>
            <input
              className="outline-none w-full h-10 bg-transparent border px-4 rounded-md"
              {...register("expensesName")}
              defaultValue={selectedExpenses.expensesName}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gelir Tutarı</label>
            <input
              type="text"
              {...register("expensesAmount")}
              defaultValue={selectedExpenses.expensesAmount}
              className="outline-none w-full h-10 bg-transparent border px-4 rounded-md"
            />
          </div>

          <button className="w-full px-4 py-2 bg-primary text-secondary font-semibold rounded-md">
            Düzenle
          </button>
        </form>
      </motion.div>
    </div>,
    modalRoot
  );
};

export default ExpensesEditModal;
