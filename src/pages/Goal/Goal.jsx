import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TbFlag } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import GoalModal from "~/components/UI/Modals/GoalModal";
import GoalMoneyModal from "~/components/UI/Modals/GoalMoneyModal";
import Topbar from "~/components/UI/Topbar";
import { getAllGoals } from "~/redux/slices/goalsSlice";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { TbCircleCheck } from "react-icons/tb";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import moment from "moment";
import toast from "react-hot-toast";

const Goal = () => {
  const [isGoalModal, setIsGoalModal] = useState(false);
  const { width, height } = useWindowSize();
  const { user } = useSelector((store) => store.user);
  const { goals, status } = useSelector((store) => store.goals);
  const [isGoalMoneyModal, setIsGoalMoneyModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [isConfetti, setIsConfetti] = useState(false);
  const [triggeredGoals, setTriggeredGoals] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.uid) {
      dispatch(getAllGoals({ userID: user.uid }));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isConfetti) {
      const timer = setTimeout(() => setIsConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isConfetti]);

  if (status === "loading") {
    return <Loader />;
  }

  const sendAccount = (goalID) => {
    setIsGoalMoneyModal(true);
    setSelectedGoal(goalID);
  };

  const completeGoal = async (goal) => {
    try {
      const goalRef = doc(db, "goals", goal.goalID);

      const completeGoals = doc(collection(db, "completeGoals"));

      await setDoc(completeGoals, {
        id: completeGoals.id,
        goalID: goal.goalID,
        goalAccount: goal.goalAccount,
        goalAmount: goal.goalAmount,
        goalTitle: goal.goalTitle,
        goalLastDate: goal.goalLastDate,
        completedAt: moment().format("DD.MM.YYYY HH:mm"),
        completedUserID: user.uid,
      });

      await deleteDoc(goalRef);

      dispatch(getAllGoals({ userID: user.uid }));

      toast.success("Hedef tamamlandı.");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGoal = (goalID) => {
    try {
      const goalRef = doc(db, "goals", goalID);
      deleteDoc(goalRef);
      toast.success("Hedef silindi.");

      dispatch(getAllGoals({ userID: user.uid }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isConfetti && <Confetti width={width} height={height} />}
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
            className="px-4 py-2 rounded-md bg-primary hover:bg-secondary hover:text-primary transition-colors text-secondary font-semibold flex items-center gap-x-1"
          >
            <TbFlag size={20} /> Hedef Ekle
          </button>
        </div>
        <div className="w-full mt-6 grid grid-cols-1 gap-10">
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <div key={index} className="border rounded-md shadow-md">
                <div className="w-full py-3 bg-zinc-100 rounded-t-md px-4 flex lg:justify-between lg:flex-row flex-col gap-y-3 items-center text-primary">
                  <span className="font-semibold">{goal.goalTitle}</span>
                  <div className="flex lg:flex-row flex-col lg:w-auto w-full gap-y-2 gap-x-2">
                    {goal.goalAccount === goal.goalAmount ? (
                      <button
                        onClick={() => completeGoal(goal)}
                        className="px-4 py-1 rounded-md lg:text-sm text-xs bg-secondary text-primary font-semibold flex items-center gap-x-1"
                      >
                        <TbCircleCheck /> Tamamlandı
                      </button>
                    ) : (
                      <button
                        onClick={() => sendAccount(goal.goalID)}
                        className="px-4 py-1 rounded-md lg:text-sm text-xs bg-primary text-secondary font-semibold"
                      >
                        Hedefe Para Aktar
                      </button>
                    )}
                    <button
                      onClick={() => deleteGoal(goal.goalID)}
                      className="px-4 py-1 rounded-md lg:text-sm text-xs bg-red-300 text-red-500 font-semibold"
                    >
                      Hedefi Sil
                    </button>
                    <span className="px-4 py-1 rounded-md text-sm bg-zinc-300 text-zinc-400 font-semibold">
                      {goal.goalLastDate}
                    </span>
                  </div>
                </div>
                <div className="bg-zinc-50 px-4 py-5 flex justify-between items-center rounded-b-md">
                  <div className="w-full h-6 bg-zinc-100 border rounded-full mr-12 p-1">
                    <div
                      className={`h-full max-w-full rounded-full transition-all duration-300 ${
                        goal.goalAccount === goal.goalAmount
                          ? "bg-secondary"
                          : "bg-zinc-400"
                      }`}
                      style={{
                        width: `${(goal.goalAccount / goal.goalAmount) * 100}%`,
                      }}
                    >
                      {goal.goalAccount === goal.goalAmount &&
                      !triggeredGoals.includes(goal.goalID)
                        ? (() => {
                            setIsConfetti(true);
                            setTriggeredGoals((prev) => [...prev, goal.goalID]);
                          })()
                        : null}
                    </div>
                  </div>

                  <div className="text-3xl font-semibold text-primary">
                    ₺
                    {goal.goalAmount <= 0
                      ? null
                      : new Intl.NumberFormat("tr-TR").format(
                          goal.goalAmount - goal.goalAccount
                        )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full bg-red-100 px-4 py-2 rounded-md text-red-500 font-medium text-sm">
              Hedefiniz Bulunmamaktadır.
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Goal;
