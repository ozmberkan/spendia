import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByID } from "~/redux/slices/userSlice";
import { infinity } from "ldrs";
import { motion } from "framer-motion";
import {
  TbEditCircle,
  TbLock,
  TbMailUp,
  TbSettings,
  TbUser,
} from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { profileInputs } from "~/data/data";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "~/firebase/firebase";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import Loader from "~/components/UI/Loader";
import profilePhoto from "~/assets/profile.png";
import { MdAdd, MdVerified } from "react-icons/md";
import Topbar from "~/components/UI/Topbar";
import SettingsPopover from "~/components/UI/SettingsPopover";

const Profile = () => {
  const { user, status } = useSelector((store) => store.user);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const [popOver, setPopOver] = useState(false);

  infinity.register();

  useEffect(() => {
    dispatch(getUserByID(user.uid));
  }, [dispatch]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      monthlyBudget: user.monthlyBudget,
      currentBudget: user.currentBudget,
    },
  });

  const saveProfileHandle = async (data) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        displayName: data.displayName,
        phoneNumber: Number(data.phoneNumber),
        monthlyBudget: Number(data.monthlyBudget),
        currentBudget: Number(data.monthlyBudget),
      });
      toast.success("Profiliniz başarıyla güncellendi.");
      dispatch(getUserByID(user.uid));
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success(
        "Şifre sıfırlama bağlantısı gönderildi. Lütfen kontrol edin."
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendVerEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success(
        "E-posta onaylama bağlantısı gönderildi. Lütfen kontrol edin."
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="p-6 h-full w-full "
      >
        <Topbar
          firstLabel={"Anasayfa"}
          firstLink={"/"}
          secondLabel={"Profilim"}
        />
        <div className="w-full py-2 flex justify-start gap-x-3 items-center">
          <div className="relative lg:block hidden">
            <img
              src={profilePhoto}
              className="lg:w-20  rounded-full shadow-md"
            />
          </div>
          <div className="flex justify-between items-center w-full lg:px-4">
            <div>
              <h1 className="lg:text-2xl  text-sm font-bold text-primary flex gap-x-2 items-center">
                {user.displayName ? user.displayName : "Kullanıcı"}{" "}
                {user.premium === true && <MdVerified />}
              </h1>
              <p className="lg:text-lg text-xs text-primary">{user.email}</p>
            </div>
            <SettingsPopover setPopOver={setPopOver} />
          </div>
        </div>
        <div className="w-full lg:p-4 flex flex-col gap-y-12">
          <div className="w-full flex flex-col gap-y-2 my-5">
            <form
              className="w-full flex flex-col gap-y-5"
              onSubmit={handleSubmit(saveProfileHandle)}
            >
              <div className="w-full flex justify-between items-center">
                <h1 className="font-semibold lg:text-xl text-sm flex gap-x-1 items-center">
                  <span className="lg:flex hidden">
                    <TbUser />
                  </span>
                  Kişisel Bilgileriniz
                </h1>
                <div className="flex items-center gap-x-2">
                  {isEditMode && (
                    <button
                      type="submit"
                      className="lg:px-4 px-2 py-2 flex items-center gap-x-1 bg-secondary rounded-md text-primary font-semibold"
                    >
                      <FaRegSave />{" "}
                      <span className="lg:block hidden">Kaydet</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="lg:px-4 px-2 py-2 flex items-center gap-x-1 bg-primary rounded-md text-secondary font-semibold"
                  >
                    <TbEditCircle />{" "}
                    <span className="lg:block hidden">Düzenle</span>
                  </button>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 w-full gap-5">
                {profileInputs.map((input, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-sm text-zinc-500">
                      {input.placeholder}
                    </span>
                    <div
                      className={`w-full px-4 h-12 rounded-md border flex items-center gap-x-5 ${
                        !isEditMode && "bg-zinc-100 text-zinc-400"
                      } `}
                    >
                      <input
                        placeholder={input.placeholder}
                        className=" outline-none w-full h-10 bg-transparent "
                        disabled={!isEditMode}
                        defaultValue={user[input.name]}
                        {...register(input.name)}
                      />
                      <span className={`p-1 rounded-md  text-primary`}>
                        <input.icon size={25} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </form>
            <div className="w-full  py-2 grid lg:grid-cols-2 gap-5">
              <button
                onClick={sendResetPassword}
                className="px-4 h-10 flex justify-center items-center gap-x-2 rounded-md border outline-none bg-primary text-secondary font-semibold lg:text-base text-sm "
              >
                <TbLock size={20} />
                Şifre Sıfırla
              </button>
              <button
                onClick={sendVerEmail}
                disabled={auth.currentUser.emailVerified}
                className="px-4 h-10 flex justify-center disabled:bg-secondary disabled:text-primary items-center gap-x-2 rounded-md border outline-none bg-primary text-secondary font-semibold lg:text-base text-sm  "
              >
                <TbMailUp size={20} />
                {auth.currentUser.emailVerified === true
                  ? "E-posta Onaylanmış!"
                  : "E-posta Onayla"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
