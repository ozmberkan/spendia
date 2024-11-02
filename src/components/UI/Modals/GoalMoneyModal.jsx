import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import moment from "moment";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { db } from "~/firebase/firebase";
import { getAllGoals } from "~/redux/slices/goalsSlice";
import { NumericFormat } from "react-number-format";

const GoalMoneyModal = ({ setIsGoalMoneyModal, selectedGoal }) => {
  const modalRoot = document.getElementById("modal");
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();
  const { user } = useSelector((state) => state.user);

  const sendMoney = async (data) => {
    try {
      const goalRef = doc(db, "goals", selectedGoal);
      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);
      const goalDoc = await getDoc(goalRef);

      if (userDoc.data().budget < 0) {
        toast.error("Bütçenizde yeterli para yok.");
        return;
      }

      if (data.goalAccount > userDoc.data().budget) {
        toast.error("Bütçenizde yeterli para yok.");
        return;
      }

      if (data.goalAccount > goalDoc.data().goalAmount) {
        toast.error("Hedeften yüksek tutar girilemez.");
        return;
      }
      await updateDoc(goalRef, {
        goalAccount:
          Number(goalDoc.data().goalAccount) + Number(data.goalAccount),
      });

      await updateDoc(userRef, {
        budget: userDoc.data().budget - data.goalAccount,
      });

      dispatch(getAllGoals({ userID: user.uid }));
      setIsGoalMoneyModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={() => setIsGoalMoneyModal(false)}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Hedefe Para Aktar</h2>
          <button
            onClick={() => setIsGoalMoneyModal(false)}
            className=" text-gray-400 hover:text-gray-600 focus:outline -none"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>
        <form
          className="grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(sendMoney)}
        >
          <NumericFormat
            type="text"
            placeholder="Hedefe Aktarılacak Tutar"
            className="px-4 py-2 rounded-md border w-full outline-none"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={true}
            prefix="₺"
            onValueChange={(values) =>
              setValue("goalAccount", values.floatValue || 0)
            }
          />

          <button className="w-full px-4 py-2 bg-primary text-secondary font-semibold rounded-md">
            Oluştur
          </button>
        </form>
      </motion.div>
    </div>,
    modalRoot
  );
};

export default GoalMoneyModal;
