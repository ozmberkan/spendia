import React from "react";
import { useSelector } from "react-redux";
import Topbar from "~/components/UI/Topbar";

const Budget = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="p-6 w-full h-full ">
      <Topbar firstLabel={"Anasayfa"} firstLink={"/"} secondLabel={"Bütçe"} />
      <div className="w-full flex justify-between items-center ">...</div>
    </div>
  );
};

export default Budget;
