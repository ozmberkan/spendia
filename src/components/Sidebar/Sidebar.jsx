import React from "react";
import Logo from "~/assets/signinlogo.svg";
import { WiStars } from "react-icons/wi";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase/firebase";
import {
  TbDoorExit,
  TbHome,
  TbMessageQuestion,
  TbMoneybag,
  TbSettings,
  TbUser,
} from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";
import { bottomSide, goalSide, mainSide } from "~/data/data";

const Sidebar = () => {
  const exit = async () => {
    try {
      await signOut(auth);
      toast.success("Çıkış yapılıyor..");
      setTimeout(() => {
        localStorage.removeItem("user");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`h-full border-r flex flex-col items-center transition-all duration-300 justify-start bg-zinc-50 w-60`}
    >
      <div className={`w-full  flex justify-between items-center px-4 py-2  `}>
        <img src={Logo} className="w-10 cursor-pointer" />
      </div>
      <div className="w-full h-full  px-4 py-2">
        <div className="flex flex-col gap-y-7 h-full">
          <div className="flex flex-col">
            <p className="text-sm pb-2 border-b border-zinc-300 font-medium text-zinc-400">
              TEMEL
            </p>
            <div className="flex flex-col gap-y-5 mt-4">
              {mainSide.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2 hover:bg-zinc-200/50"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm pb-2 border-b border-zinc-300 font-medium text-zinc-400">
              HEDEF
            </p>
            <div className="flex flex-col gap-y-5 mt-4">
              {goalSide.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2 hover:bg-zinc-200/50"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-auto mb-6">
            <div className="flex flex-col mt-auto mb-6">
              <div className="flex flex-col gap-y-5 mt-2">
                {bottomSide.map((item) =>
                  item.type === "link" ? (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2 hover:bg-zinc-200/50 ${
                        item.label === "Premium" &&
                        "bg-emerald-100 text-emerald-500 border-emerald-500 shadow-xl shadow-emerald-500/20 relative overflow-hidden hover:bg-emerald-300/50"
                      }`}
                    >
                      {item.label === "Premium" && (
                        <WiStars
                          className="absolute top-0 right-0 animate-pulse"
                          size={70}
                        />
                      )}
                      <item.icon size={20} />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      className="text-sm border w-full py-2 bg-zinc-100 hover:text-red-500 rounded-md px-4 flex justify-start items-center gap-x-2"
                    >
                      <item.icon size={20} />
                      {item.label}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
