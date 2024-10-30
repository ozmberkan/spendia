import React from "react";
import Logo from "~/assets/vite.svg";
import { dotSpinner } from "ldrs";
import Sidebar from "~/components/Sidebar/Sidebar";

const Home = () => {
  dotSpinner.register();
  return (
    <div className=" flex justify-center items-center flex-grow h-full">
      <img src={Logo} className="w-80 drop-shadow-2xl animate-wiggle" />
      <span className="absolute ">
        <l-dot-spinner size="40" speed="0.9" color="#194939"></l-dot-spinner>
      </span>
    </div>
  );
};

export default Home;
