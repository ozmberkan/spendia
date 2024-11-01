import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import moment from "moment";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { db } from "~/firebase/firebase";

const GoalModal = ({ setIsGoalModal }) => {
  const modalRoot = document.getElementById("modal");

  const { register, handleSubmit } = useForm();
  const { user } = useSelector((state) => state.user);

  const createGoal = async (data) => {
    try {
      const goalRef = doc(collection(db, "goals"));
      const userRef = doc(db, "users", user.uid);

      await setDoc(goalRef, {
        goalTitle: data.goalTitle,
        goalAmount: data.goalAmount,
        goalLastDate: moment(data.goalDate).format("DD.MM.YYYY"),
        goalStatus: "pending",
        createdUserID: user.uid,
        createdAt: moment().format("DD.MM.YYYY HH:mm"),
      });

      await updateDoc(userRef, {
        goals: arrayUnion(goalRef.id),
      });

      toast.success("Hedef başarıyla oluşturuldu.");
      setIsGoalModal(false);
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
          <h2 className="text-2xl font-bold">Hedef Oluştur</h2>
          <button
            onClick={() => setIsGoalModal(false)}
            className=" text-gray-400 hover:text-gray-600 focus:outline -none"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>
        <form
          className="grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(createGoal)}
        >
          <input
            placeholder="Hedefin Amacı"
            className="px-4 py-2 rounded-md border w-full outline-none"
            {...register("goalTitle")}
          />
          <input
            placeholder="Hedefin Tutarı"
            className="px-4 py-2 rounded-md border w-full outline-none"
            {...register("goalAmount")}
          />
          <input
            type="date"
            min={moment().format("YYYY-MM-DD")}
            className="px-4 py-2 rounded-md border w-full outline-none"
            {...register("goalDate")}
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

export default GoalModal;
