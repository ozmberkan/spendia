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
import { getAllIncomes } from "~/redux/slices/budgetsSlice";

const IncomeAddModal = ({ setIsIncomeModal }) => {
  const modalRoot = document.getElementById("modal");
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { register, handleSubmit, setValue, reset } = useForm();

  const dispatch = useDispatch();

  const addIncome = async (data) => {
    try {
      const incomesRef = doc(collection(db, "incomes"));

      const userRef = doc(db, "users", user.uid);

      await setDoc(incomesRef, {
        incomeID: incomesRef.id,
        incomeType: data.incomeType,
        incomeName: data.incomeName,
        incomeAmount: data.incomeAmount,
        createdUser: user.uid,
        createdAt: moment().format("DD.MM.YYYY HH:mm"),
      });

      await updateDoc(userRef, {
        currentBudget: user.currentBudget + Number(data.incomeAmount),
      });

      toast.success("Gelir başarıyla eklendi.");
      dispatch(getAllIncomes({ userID: user.uid }));
      setIsIncomeModal(false);
      reset();
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
          <h2 className="text-2xl font-bold">Gelir Oluştur</h2>
          <button
            onClick={() => setIsIncomeModal(false)}
            className=" text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>
        <form
          className="grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(addIncome)}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gelir Tipi</label>
            <select
              placeholder="Gelir Tipi"
              className="outline-none w-full h-10 bg-transparent border px-4 rounded-md"
              {...register("incomeType")}
            >
              <option value="">Seçiniz..</option>
              <option value="regular">Düzenli</option>
              <option value="irregular">Düzensiz</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gelir Adı</label>
            <input
              placeholder="Gelir Adı"
              className="outline-none w-full h-10 bg-transparent border px-4 rounded-md"
              {...register("incomeName")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Gelir Tutarı</label>
            <NumericFormat
              type="text"
              placeholder="Gelir Tutarı"
              className="px-4 py-2 rounded-md border w-full outline-none"
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              prefix="₺"
              onValueChange={(values) =>
                setValue("incomeAmount", values.floatValue || 0)
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

export default IncomeAddModal;
