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
        isOpen ? "lg:w-60 w-20" : "w-24"
      }`}
    >
      <div
        className={`w-full flex justify-${
          isOpen ? " start" : "center"
        } gap-x-2 items-center px-4 py-2 my-3`}
      >
        <img src={Logo} className="w-10 cursor-pointer" />
        <div
          className={`flex flex-col transition-all duration-500 ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          {isOpen && (
            <>
              <span className="font-bold text-primary lg:block hidden">
                Spendia
              </span>
              <span className="text-xs lg:block hidden">Tutarlı Ol!</span>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-full px-4 py-2">
        <div className="flex flex-col gap-y-7 h-full">
          <div className="flex flex-col">
            <p
              className={`lg:text-sm text-xs text-center lg:text-left pb-2 border-b border-zinc-300 font-medium text-zinc-400 ${
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
                  className={`text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex ${
                    isOpen ? "justify-start" : "justify-center"
                  } items-center gap-x-2 hover:bg-zinc-200/50`}
                >
                  <span>
                    <item.icon size={15} />
                  </span>
                  <div
                    className={`transition-all lg:block hidden duration-500 ${
                      isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  >
                    {isOpen && <span>{item.label}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p
              className={`lg:text-sm text-xs text-center lg:text-left  pb-2 border-b border-zinc-300 font-medium text-zinc-400 ${
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
                  className={`text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex ${
                    isOpen ? "justify-start" : "justify-center"
                  } items-center gap-x-2 hover:bg-zinc-200/50`}
                >
                  <span>
                    <item.icon size={15} />
                  </span>
                  <div
                    className={`transition-all lg:block hidden duration-500 ${
                      isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  >
                    {isOpen && <span>{item.label}</span>}
                  </div>
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
                    className={`text-sm border w-full py-2 bg-zinc-100 rounded-md px-4 flex ${
                      isOpen ? "justify-start" : "justify-center"
                    } items-center gap-x-2 hover:bg-zinc-200/50`}
                  >
                    <span>
                      <item.icon size={15} />
                    </span>
                    <div
                      className={`transition-all lg:block hidden duration-500 ${
                        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                    >
                      {isOpen && <span>{item.label}</span>}
                    </div>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={exit}
                    className={`text-sm   border-red-500 transition-colors   text-red-500 border w-full py-2 bg-zinc-100  rounded-md px-4 flex ${
                      isOpen ? "justify-start" : "justify-center"
                    } items-center gap-x-2`}
                  >
                    <item.icon size={20} className="" />
                    <div
                      className={`transition-all lg:block hidden duration-500   ${
                        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                    >
                      {isOpen && (
                        <span className="font-semibold">{item.label}</span>
                      )}
                    </div>
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
