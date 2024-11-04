import { useSelector } from "react-redux";
import Topbar from "~/components/UI/Topbar";

const Notifications = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="p-6 w-full h-full">
      <Topbar
        firstLabel={"Anasayfa"}
        firstLink={"/"}
        secondLabel={"Bildirimler"}
      />
      <div>yakında...</div>
    </div>
  );
};

export default Notifications;
