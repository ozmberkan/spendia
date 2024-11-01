import React from "react";
import Topbar from "~/components/UI/Topbar";

const Settings = () => {
  return (
    <div className="p-6 w-full h-full ">
      <Topbar
        firstLabel={"Anasayfa"}
        firstLink={"/"}
        secondLabel={"Ayarlarım"}
      />
      <div className="w-full flex justify-between items-center ">...</div>
    </div>
  );
};

export default Settings;
