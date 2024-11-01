import { motion } from "framer-motion";
import moment from "moment";
import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";

const GoalModal = ({ setIsGoalModal }) => {
  const modalRoot = document.getElementById("modal");

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
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
        <form className="grid grid-cols-1 gap-5">
          <input
            placeholder="Hedefin Amacı"
            className="px-4 py-2 rounded-md border w-full outline-none"
          />
          <input
            placeholder="Hedefin Tutarı"
            className="px-4 py-2 rounded-md border w-full outline-none"
          />
          <input
            type="date"
            min={moment().format("YYYY-MM-DD")}
            className="px-4 py-2 rounded-md border w-full outline-none"
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
