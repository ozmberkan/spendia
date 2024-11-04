import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import moment from "moment";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "~/firebase/firebase";
import { getAllExpenses } from "~/redux/slices/budgetsSlice";
import { getUserByID } from "~/redux/slices/userSlice";

const ExpensesAddModal = ({ setIsExpensesAddModal }) => {
  const modalRoot = document.getElementById("modal");
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { register, handleSubmit, setValue, reset } = useForm();

  const dispatch = useDispatch();

  const createExpenses = async (data) => {
    try {
      const expensesRef = doc(collection(db, "expenses"));
      const userRef = doc(db, "users", user.uid);

      await setDoc(expensesRef, {
        expensesID: expensesRef.id,
        expensesType: data.expensesType,
        expensesName: data.expensesName,
        expensesAmount: data.expensesAmount,
        createdUser: user.uid,
        createdAt: moment().format("DD.MM.YYYY HH:mm"),
      });

      await updateDoc(userRef, {
        currentBudget: user.currentBudget - Number(data.expensesAmount),
      });

      toast.success("Gider başarıyla eklendi.");
      dispatch(getAllExpenses({ userID: user.uid }));
      dispatch(getUserByID(user.uid));
      setIsExpensesAddModal(false);
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
          <h2 className="text-2xl font-bold">Gider Oluştur</h2>
          <button
            onClick={() => setIsExpensesAddModal(false)}
            className=" text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>
        <form
          className="grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(createExpenses)}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gider Tipi</label>
            <select
              placeholder="Gider Tipi"
              className="outline-none w-full h-10 bg-transparent border px-4 rounded-md"
              {...register("expensesType")}
            >
              <option value="">Seçiniz..</option>
              <option value="regular">Düzenli</option>
              <option value="irregular">Düzensiz</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gider Adı</label>
            <input
              placeholder="Gider Adı"
              className="outline-none w-full h-10 bg-transparent border px-4 rounded-md"
              {...register("expensesName")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gider Tutarı</label>
            <NumericFormat
              type="text"
              placeholder="Gider Tutarı"
              className="px-4 py-2 rounded-md border w-full outline-none"
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              prefix="₺"
              onValueChange={(values) =>
                setValue("expensesAmount", values.floatValue || 0)
              }
            />
          </div>

          <button className="w-full px-4 py-2 bg-primary text-secondary font-semibold rounded-md">
            Oluştur
          </button>
        </form>
      </motion.div>
    </div>,
    modalRoot
  );
};

export default ExpensesAddModal;
