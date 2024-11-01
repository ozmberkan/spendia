import React from "react";
import Logo from "~/assets/signinlogo.svg";
import { WiStars } from "react-icons/wi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase/firebase";
import { bottomSide, goalSide, mainSide } from "~/data/data";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isOpen } = useSelector((store) => store.sidebar);

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
      className={`h-full border-r flex flex-col transition-all duration-700 items-center justify-start bg-zinc-50 ${
        isOpen ? "w-60" : "w-24"
      }`}
    >
      <div
        className={`w-full flex justify-${
          isOpen ? "start" : "center"
        } gap-x-2 items-center px-4 py-2 my-3`}
      >
        <img src={Logo} className="w-10 cursor-pointer" />
        {isOpen && (
          <div className="flex flex-col">
            <span className="font-bold text-primary">Spendia</span>
            <span className="text-xs">Tutarlı Ol!</span>
          </div>
        )}
      </div>

      <div className="w-full h-full px-4 py-2">
        <div className="flex flex-col gap-y-7 h-full">
          <div className="flex flex-col">
            <p
              className={`text-sm pb-2 border-b border-zinc-300 font-medium text-zinc-400 ${
                !isOpen && "flex justify-center items-center"
              }`}
            >
              TEMEL
            </p>
            <div className="flex flex-col gap-y-5 mt-4">
              {mainSide.map((item) => (
                <Link
                  to={item.path}
                  key={item.id}
                  className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2 hover:bg-zinc-200/50"
                >
                  <item.icon size={20} />
                  {isOpen && (
                    <span className="transition-all duration-300">
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p
              className={`text-sm pb-2 border-b border-zinc-300 font-medium text-zinc-400 ${
                !isOpen && "flex justify-center items-center"
              }`}
            >
              HEDEF
            </p>
            <div className="flex flex-col gap-y-5 mt-4">
              {goalSide.map((item) => (
                <Link
                  to={item.path}
                  key={item.id}
                  className="text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2 hover:bg-zinc-200/50"
                >
                  <item.icon size={20} />
                  {isOpen && (
                    <span className="transition-all duration-300">
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-auto mb-6">
            <div className="flex flex-col gap-y-5 mt-2">
              {bottomSide.map((item) =>
                item.type === "link" ? (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2 hover:bg-zinc-200/50 ${
                      item.label === "Premium" &&
                      "bg-emerald-100 text-emerald-500 font-bold border-emerald-500 shadow-xl shadow-emerald-500/20 relative overflow-hidden hover:bg-emerald-300/50"
                    }`}
                  >
                    {item.label === "Premium" && (
                      <WiStars
                        className="absolute top-0 right-0 animate-pulse"
                        size={70}
                      />
                    )}
                    <item.icon size={20} />
                    {isOpen && (
                      <span className="transition-all duration-300">
                        {item.label}
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={exit}
                    className="text-sm border w-full py-2 bg-zinc-100 hover:text-red-500 rounded-md px-4 flex justify-start items-center gap-x-2"
                  >
                    <item.icon size={20} />
                    {isOpen && (
                      <span className="transition-all duration-300">
                        {item.label}
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
