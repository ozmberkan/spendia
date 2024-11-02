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

const GoalMoneyModal = ({ setIsGoalMoneyModal, selectedGoal }) => {
  const modalRoot = document.getElementById("modal");
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const { user } = useSelector((state) => state.user);

  const sendMoney = async (data) => {
    try {
      const goalRef = doc(db, "goals", selectedGoal);
      const userRef = doc(db, "users", user.uid);

      const goalDoc = await getDoc(goalRef);
      const userDoc = await getDoc(userRef);

      await updateDoc(goalRef, {
        goalAccount: Number(data.goalAccount),
        goalAmount: goalDoc.data().goalAmount - data.goalAccount,
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
      onClick={() => setIsGoalModal(false)}
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
            onClick={() => setIsGoalModal(false)}
            className=" text-gray-400 hover:text-gray-600 focus:outline -none"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>
        <form
          className="grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(sendMoney)}
        >
          <input
            placeholder="Hedefe Aktarılacak Tutar"
            className="px-4 py-2 rounded-md border w-full outline-none"
            {...register("goalAccount")}
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