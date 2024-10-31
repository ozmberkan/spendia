import React, { useState } from "react";
import Logo from "~/assets/signinlogo.svg";
import { GoSidebarExpand } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase/firebase";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const exit = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      toast.success("Çıkış yapıldı");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-full border-r flex flex-col items-center transition-all duration-300 justify-start bg-zinc-50  ${
        isOpen && "w-80"
      } ${!isOpen && "w-20"}`}
    >
      <div
        className={`w-full  flex ${
          isOpen ? "justify-between" : "items-center"
        } items-center px-4 py-2  `}
      >
        <img
          onClick={() => setIsOpen(!isOpen)}
          src={Logo}
          className="w-10 cursor-pointer"
        />
        {isOpen && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <GoSidebarExpand size={20} />
          </button>
        )}
      </div>
      <div className="w-full h-full  px-4 py-2">
        <div className="flex flex-col gap-y-7 h-full">
          <div className="flex flex-col">
            <p className="text-sm pb-2 border-b border-zinc-300">MAIN</p>
            <div className="flex flex-col gap-y-5 mt-4">
              <Link
                to="/"
                className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2"
              >
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
              <Link
                to="/profile"
                className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2"
              >
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Profilim</span>
              </Link>
              <Link
                to="/budget-management"
                className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2"
              >
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>
                  Bütçe Yönetimi
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm pb-2 border-b border-zinc-300">HEDEF</p>
            <div className="flex flex-col gap-y-5 mt-4">
              <Link
                to="/goals"
                className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2"
              >
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Hedefler</span>
              </Link>
              <Link
                to="/settings"
                className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2"
              >
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Ayarlarım</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col mt-auto mb-6">
            <div className="flex flex-col gap-y-5 mt-2">
              <Link
                to="/premium"
                className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2"
              >
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Premium</span>
              </Link>
              <button
                onClick={exit}
                className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2"
              >
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
