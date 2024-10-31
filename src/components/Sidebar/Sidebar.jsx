import React, { useState } from "react";
import Logo from "~/assets/signinlogo.svg";
import { GoSidebarExpand } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-full border-r flex flex-col items-center transition-all duration-300 justify-start bg-zinc-50  ${
        isOpen && "w-56"
      } ${!isOpen && "w-20"}`}
    >
      <div
        className={`w-full  flex ${
          isOpen ? "justify-between" : "items-center"
        } items-center px-4 py-2 bg-red-500 `}
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
            <div className="flex flex-col gap-y-5 mt-2">
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm pb-2 border-b border-zinc-300">MAIN</p>
            <div className="flex flex-col gap-y-5 mt-2">
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm pb-2 border-b border-zinc-300">MAIN</p>
            <div className="flex flex-col gap-y-5 mt-2">
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
              <Link className="text-sm w-full py-2 bg-zinc-100 rounded-md px-4 flex justify-start items-center gap-x-2">
                <FaHome size={15} />
                <span className={isOpen ? "flex" : "hidden"}>Anasayfa</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
