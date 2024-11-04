import { doc, updateDoc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { MdSwitchAccessShortcut } from "react-icons/md";
import { TbAlertCircle, TbFileAlert, TbTarget } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import Topbar from "~/components/UI/Topbar";
import { db } from "~/firebase/firebase";
import { getAllExpenses, getAllIncomes } from "~/redux/slices/budgetsSlice";
import { getAllGoals } from "~/redux/slices/goalsSlice";
import { getUserByID } from "~/redux/slices/userSlice";
import { PiMoneyWavy, PiMoneyWavyFill } from "react-icons/pi";
import { FiAlertCircle } from "react-icons/fi";
import GoalModal from "~/components/UI/Modals/GoalModal";
import IncomeAddModal from "~/components/UI/Modals/IncomeAddModal";
import ExpensesAddModal from "~/components/UI/Modals/ExpensesAddModal";

const Home = () => {
  const { user, status } = useSelector((store) => store.user);
  const { goals } = useSelector((store) => store.goals);
  const { incomes, expenses } = useSelector((store) => store.budgets);
  const dispatch = useDispatch();

  const [isGoalModal, setIsGoalModal] = useState(false);
  const [isIncomeModal, setIsIncomeModal] = useState(false);
  const [isExpensesAddModal, setIsExpensesAddModal] = useState(false);

  const formattedBudget = new Intl.NumberFormat("tr-TR").format(
    user.currentBudget
  );
  const todayDate = moment().format("DD.MM.YYYY");

  useEffect(() => {
    const checkAndUpdateBudget = async () => {
      if (todayDate.slice(0, 2) === "01") {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const lastUpdateDate = userSnapshot.data().lastUpdateDate;

          if (lastUpdateDate !== todayDate) {
            try {
              await updateDoc(userRef, {
                currentBudget:
                  userSnapshot.data().currentBudget + user.monthlyBudget,
                lastUpdateDate: todayDate,
              });
              toast.success("Bütçeniz güncellendi.");
              dispatch(getUserByID(user.uid));
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    };

    checkAndUpdateBudget();
  }, [todayDate, user.uid]);

  useEffect(() => {
    dispatch(getUserByID(user.uid));
    dispatch(getAllGoals({ userID: user.uid }));
    dispatch(getAllIncomes({ userID: user.uid }));
    dispatch(getAllExpenses({ userID: user.uid }));
  }, [dispatch, user.uid]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      {isGoalModal && <GoalModal setIsGoalModal={setIsGoalModal} />}
      {isIncomeModal && <IncomeAddModal setIsIncomeModal={setIsIncomeModal} />}
      {isExpensesAddModal && (
        <ExpensesAddModal setIsExpensesAddModal={setIsExpensesAddModal} />
      )}
      <div className="p-6 w-full h-full flex flex-col gap-4 ">
        <Topbar firstLabel={"Anasayfa"} />
        <div className="w-full flex justify-between items-center ">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl text-primary">
              {user.displayName}
            </h1>
            <span className="text-xs text-primary">{user.email}</span>
          </div>
          <div className="font-bold text-3xl text-secondary px-4 py-2 rounded-md bg-primary">
            <span>₺{formattedBudget}</span>
          </div>
        </div>
        <div className=" flex-grow grid grid-cols-4 grid-rows-5 gap-5 rounded-xl">
          <div className="bg-white border-t-8 shadow-xl border-primary  col-span-3 row-span-1 rounded-xl">
            <div className="w-full rounded-t-xl p-3 border-b  ">
              <span className="font-semibold text-primary flex gap-x-2 items-center">
                <MdSwitchAccessShortcut />
                Hızlı İşlemler
              </span>
            </div>
            <div className="w-full p-3 grid grid-cols-3 gap-5">
              <button
                onClick={() => setIsGoalModal(true)}
                className="px-4  py-2 text-primary rounded-md bg-white border-2 border-primary flex gap-x-1 items-center hover:bg-primary hover:text-white"
              >
                <TbTarget size={20} />
                Hedef Ekle
              </button>
              <button
                onClick={() => setIsIncomeModal(true)}
                className="px-4 py-2 text-primary rounded-md bg-white border-2 border-primary flex gap-x-1 items-center hover:bg-primary hover:text-white"
              >
                <GiReceiveMoney size={20} />
                Gelir Ekle
              </button>
              <button
                onClick={() => setIsExpensesAddModal(true)}
                className="px-4 py-2 text-primary rounded-md bg-white border-2 border-primary flex gap-x-1 items-center hover:bg-primary hover:text-white"
              >
                <GiPayMoney size={20} />
                Gider Ekle
              </button>
            </div>
          </div>
          <div className="bg-white border-t-8 shadow-xl border-primary col-span-1 row-span-5 rounded-xl">
            <div className="w-full rounded-t-xl  flex justify-between items-center p-3 border-b">
              <span className="font-semibold text-primary flex gap-x-2 items-center">
                <GiReceiveMoney />
                Gelirlerim
              </span>
              <span className="font-semibold text-secondary">
                +
                {incomes
                  .reduce((total, income) => total + income.incomeAmount, 0)
                  .toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                ₺
              </span>
            </div>
            <div className="p-3 flex flex-col gap-3 ">
              {incomes.length > 0 ? (
                incomes.map((income) => (
                  <div
                    key={income.incomeID}
                    className="w-full border flex flex-col rounded-md gap-1 py-2 px-3"
                  >
                    <div className="pb-2 border-b flex justify-between items-center">
                      <span className="text-sm font-semibold text-primary ">
                        {income.incomeName}
                      </span>
                      <span className="text-primary">
                        <PiMoneyWavy size={20} />
                      </span>
                    </div>
                    <div className="py-2 flex justify-between items-center">
                      <span className=" text-sm text-primary font-medium">
                        {income.incomeType === "regular"
                          ? "Düzenli"
                          : "Düzensiz"}
                      </span>
                      <span className=" text-sm text-primary font-semibold">
                        {income.incomeAmount.toLocaleString("tr-TR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        ₺
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-primary font-medium flex items-center gap-x-1">
                  <TbAlertCircle />
                  Henüz bir gelir bulunmamaktadır.
                </div>
              )}
            </div>
          </div>
          <div className="bg-white border-t-8 shadow-xl border-primary row-span-4 rounded-xl">
            <div className="w-full rounded-t-xl  p-3 border-b flex justify-between items-center">
              <span className="font-semibold text-primary flex gap-x-2 items-center">
                <GiPayMoney />
                Giderlerim
              </span>
              <span className="font-semibold text-red-500">
                -
                {expenses
                  .reduce(
                    (total, expenses) => total + expenses.expensesAmount,
                    0
                  )
                  .toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                ₺
              </span>
            </div>
            <div className="p-3 flex flex-col gap-3 ">
              {expenses.length > 0 ? (
                expenses.map((expenses) => (
                  <div
                    key={expenses.expensesID}
                    className="w-full border flex flex-col rounded-md gap-1 py-2 px-3"
                  >
                    <div className="pb-2 border-b flex justify-between items-center">
                      <span className="text-sm font-semibold text-primary ">
                        {expenses.expensesName}
                      </span>
                      <span className="text-primary">
                        <PiMoneyWavyFill size={20} />
                      </span>
                    </div>
                    <div className="py-2 flex justify-between items-center">
                      <span className=" text-sm text-primary font-medium">
                        {expenses.expensesType === "regular"
                          ? "Düzenli"
                          : "Düzensiz"}
                      </span>
                      <span className=" text-sm text-primary font-semibold">
                        {expenses.expensesAmount.toLocaleString("tr-TR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        ₺
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-primary font-medium flex items-center gap-x-1">
                  <TbAlertCircle />
                  Henüz bir gider bulunmamaktadır.
                </div>
              )}
            </div>
          </div>
          <div className=" bg-white border-t-8 shadow-xl border-primary row-span-4 col-span-2 rounded-xl">
            <div className="w-full rounded-t-xl  p-3 border-b">
              <span className="font-semibold text-primary flex gap-x-2 items-center">
                <TbTarget />
                Aktif Hedeflerim
              </span>
            </div>
            <div className="p-3 ">
              {goals.length > 0 ? (
                <div className="flex flex-col gap-1 w-full border rounded-md ">
                  <div className="w-full grid grid-cols-4  place-items-center py-2 bg-zinc-100 rounded-t-md">
                    <span className="text-xs uppercase">Başlık</span>
                    <span className="text-xs uppercase">Hedef Tutarı</span>
                    <span className="text-xs uppercase">
                      Hedefe Kalan Tutar
                    </span>
                    <span className="text-xs uppercase">Son Tarihi</span>
                  </div>
                  <div className="overflow-y-auto max-h-80">
                    {goals.map((goal) => (
                      <div key={goal.goalID} className="w-full  rounded-md ">
                        <div className="w-full grid grid-cols-4  place-items-center py-2  rounded-md">
                          <span className="text-sm">{goal.goalTitle}</span>
                          <span className="text-sm">
                            {goal.goalAmount.toLocaleString("tr-TR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            ₺
                          </span>
                          <span className="text-sm">
                            {(
                              goal.goalAmount - goal.goalAccount
                            ).toLocaleString("tr-TR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            ₺
                          </span>
                          <span className="text-sm">{goal.goalLastDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-primary font-medium flex items-center gap-x-1">
                  <TbAlertCircle />
                  Henüz bir hedef bulunmamaktadır.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
