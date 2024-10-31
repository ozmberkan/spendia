import React, { useState } from "react";
import Logo from "~/assets/signinlogo.svg";
import { GoSidebarExpand } from "react-icons/go";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-full border-r flex flex-col items-center transition-all duration-300 justify-start bg-zinc-50  ${
        isOpen && "w-56"
      } ${!isOpen && "w-20"}`}
    >
      <div className="w-full  flex justify-between items-center px-4 py-2  ">
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
    </div>
  );
};

export default Sidebar;
