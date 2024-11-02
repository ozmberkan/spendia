import { doc, updateDoc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import Topbar from "~/components/UI/Topbar";
import { db } from "~/firebase/firebase";
import { getUserByID } from "~/redux/slices/userSlice";

const Home = () => {
  const { user, status } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const formattedBudget = new Intl.NumberFormat("tr-TR").format(
    user.currentBudget
  );
  const todayDate = moment().format("DD.MM.YYYY");

  useEffect(() => {
    const checkAndUpdateBudget = async () => {
      if (todayDate.slice(0, 2) === "03") {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const lastUpdateDate = userSnapshot.data().lastUpdateDate;

          if (lastUpdateDate !== todayDate) {
            try {
              await updateDoc(userRef, {
                currentBudget: user.monthlyBudget,
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
  }, [dispatch, user.uid]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="p-6 w-full h-full flex flex-col gap-4 ">
      <Topbar firstLabel={"Anasayfa"} />
      <div className="w-full flex justify-between items-center ">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl text-primary">
            {user.displayName}
          </h1>
          <span className="text-sm">{user.email}</span>
        </div>
        <div className="font-bold text-3xl text-secondary px-4 py-2 rounded-md bg-primary">
          <span>₺{formattedBudget}</span>
        </div>
      </div>
      <div className=" flex-grow grid grid-cols-4 grid-rows-3 gap-5 rounded-xl">
        <div className="bg-zinc-100 border col-span-3 row-span-1 rounded-xl">
          Hızlı Kısayollar
        </div>
        <div className="bg-zinc-100 border col-span-1 row-span-4 rounded-xl">
          Gelir Tablosu
        </div>
        <div className="bg-zinc-100 border row-span-3 rounded-xl">3</div>
        <div className=" bg-zinc-100 border row-span-3 col-span-2 rounded-xl">
          Hedef Tablosu
        </div>
      </div>
    </div>
  );
};

export default Home;
