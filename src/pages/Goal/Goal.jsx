import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbFlag } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "~/components/UI/Breadcrumb";
import Loader from "~/components/UI/Loader";
import GoalModal from "~/components/UI/Modals/GoalModal";
import GoalMoneyModal from "~/components/UI/Modals/GoalMoneyModal";
import Topbar from "~/components/UI/Topbar";
import { getAllGoals } from "~/redux/slices/goalsSlice";

const Goal = () => {
  const [isGoalModal, setIsGoalModal] = useState(false);

  const { user } = useSelector((store) => store.user);
  const { goals, status } = useSelector((store) => store.goals);

  const [isGoalMoneyModal, setIsGoalMoneyModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.uid) {
      dispatch(getAllGoals({ userID: user.uid }));
    }
  }, [user, dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  const sendAccount = (goalID) => {
    setIsGoalMoneyModal(true);
    setSelectedGoal(goalID);
  };

  return (
    <>
      {isGoalMoneyModal && (
        <GoalMoneyModal
          setIsGoalMoneyModal={setIsGoalMoneyModal}
          selectedGoal={selectedGoal}
        />
      )}
      {isGoalModal && <GoalModal setIsGoalModal={setIsGoalModal} />}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="p-6 w-full h-full"
      >
        <Topbar
          firstLabel={"Anasayfa"}
          firstLink={"/"}
          secondLabel={"Hedefler"}
        />
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => setIsGoalModal(true)}
            className="px-4 py-2 rounded-md bg-primary text-secondary font-semibold flex items-center gap-x-1"
          >
            <TbFlag size={20} /> Hedef Ekle
          </button>
        </div>
        <div className="w-full mt-12 grid grid-cols-1 gap-10">
          {goals.map((goal, index) => (
            <div key={index} className="border rounded-md shadow-md">
              <div className="w-full py-3 bg-primary rounded-t-md px-4 flex justify-between items-center text-secondary">
                <span className="font-semibold">{goal.goalTitle}</span>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => sendAccount(goal.goalID)}
                    className="px-4 py-1 rounded-md text-sm bg-secondary text-primary font-semibold"
                  >
                    Hedefe Para Aktar
                  </button>
                  <span className="px-4 py-1 rounded-md text-sm bg-secondary text-primary font-semibold">
                    {goal.goalLastDate}
                  </span>
                </div>
              </div>
              <div className="bg-zinc-50 px-4 py-5 flex justify-between items-center rounded-b-md">
                <div className="w-full h-6 bg-zinc-100 border rounded-full mr-12 p-1">
                  <div
                    className="h-full bg-zinc-400 max-w-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(goal.goalAccount / goal.goalAmount) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="text-3xl font-semibold text-primary">
                  ₺{goal.goalAmount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Goal;
