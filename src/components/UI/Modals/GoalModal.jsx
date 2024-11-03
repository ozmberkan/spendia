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
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { db } from "~/firebase/firebase";
import { getAllGoals } from "~/redux/slices/goalsSlice";

const GoalModal = ({ setIsGoalModal }) => {
  const modalRoot = document.getElementById("modal");
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();
  const { user } = useSelector((state) => state.user);

  const createGoal = async (data) => {
    try {
      const goalRef = doc(collection(db, "goals"));
      const userRef = doc(db, "users", user.uid);

      await setDoc(goalRef, {
        goalID: goalRef.id,
        goalTitle: data.goalTitle,
        goalAmount: Number(data.goalAmount),
        goalLastDate: moment(data.goalDate).format("DD.MM.YYYY"),
        goalAccount: 0,
        goalStatus: "pending",
        createdUserID: user.uid,
        createdAt: moment().format("DD.MM.YYYY HH:mm"),
      });
      await updateDoc(userRef, {
        goals: arrayUnion(goalRef.id),
      });

      toast.success("Hedef başarıyla oluşturuldu.");
      setIsGoalModal(false);
      dispatch(getAllGoals({ userID: user.uid }));
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
            {...register("goalTitle", { required: true })}
          />
          <NumericFormat
            type="text"
            placeholder="Hedefin Tutarı"
            className="px-4 py-2 rounded-md border w-full outline-none"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={true}
            prefix="₺"
            onValueChange={(values) =>
              setValue("goalAmount", values.floatValue || 0)
            }
          />
          <input
            type="date"
            min={moment().format("YYYY-MM-DD")}
            className="px-4 py-2 rounded-md border w-full outline-none"
            {...register("goalDate", { required: true })}
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
