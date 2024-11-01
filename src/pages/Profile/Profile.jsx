import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByID } from "~/redux/slices/userSlice";
import { infinity } from "ldrs";
import { motion } from "framer-motion";
import Breadcrumb from "~/components/UI/Breadcrumb";

const Profile = () => {
  const { user, status } = useSelector((store) => store.user);
  infinity.register();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserByID(user.uid));
  }, []);

  if (status === "loading") {
    return (
      <div className="w-full flex-grow  flex justify-center items-center">
        <l-infinity
          size="200"
          stroke="10"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="#80bd3a"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 h-full  w-full "
    >
      <Breadcrumb
        firstLabel={"Anasayfa"}
        firstLink={"/"}
        secondLabel={"Profil"}
        secondLink={"/profile"}
      />
      <div className="w-full bg-red-500 px-4 py-2 flex justify-start gap-x-2 items-center">
        <img
          src="https://avatars.githubusercontent.com/u/148571945?v=4"
          className="w-20 rounded-md shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          <p className="text-lg">{user.email}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
