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
      <div className="w-full flex justify-between items-center ">
        <ul className="list-disc">
          <li>
            Kullanıcı Select bazında hangi gün maaşının yenileneceğini
            seçebilir..
          </li>
          <li>Kullanıcı Karanlık Mod / Aydınlık Mod</li>
          <li>Kullanıcı Bildirimleri açıp kapatabilir.</li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
