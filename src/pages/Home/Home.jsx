import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/UI/Loader";
import Topbar from "~/components/UI/Topbar";
import { getUserByID } from "~/redux/slices/userSlice";

const Home = () => {
  const { user, status } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const formattedBudget = new Intl.NumberFormat("tr-TR").format(user.budget);

  useEffect(() => {
    dispatch(getUserByID(user.uid));
  }, []);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="p-6 w-full h-full ">
      <Topbar firstLabel={"Anasayfa"} />
      <div className="w-full flex justify-between items-center ">
        <h1 className="font-bold text-3xl text-primary">{user.displayName}</h1>
        <div className="font-bold text-3xl text-secondary px-4 py-2 rounded-md bg-primary">
          <span>₺{formattedBudget}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
