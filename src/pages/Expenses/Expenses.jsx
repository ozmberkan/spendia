import React from "react";
import Topbar from "~/components/UI/Topbar";

const Expenses = () => {
  return (
    <div className="p-6 w-full h-full ">
      <Topbar
        firstLabel={"Anasayfa"}
        firstLink={"/"}
        secondLabel={"Giderlerim"}
      />
      <div className="w-full flex justify-between items-center ">
        Yakında...
      </div>
    </div>
  );
};

export default Expenses;
