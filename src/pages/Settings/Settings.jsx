import React from "react";
import { IoReloadCircleOutline } from "react-icons/io5";
import { TbBell, TbMoon, TbSettings, TbThermometer } from "react-icons/tb";
import { useSelector } from "react-redux";
import Topbar from "~/components/UI/Topbar";

const Settings = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="p-6 w-full h-full ">
      <Topbar
        firstLabel={"Anasayfa"}
        firstLink={"/"}
        secondLabel={"Ayarlarım"}
      />
      <div className="py-3 w-full flex justify-between items-center">
        <h1 className=" text-primary font-semibold flex items-center gap-1">
          <TbSettings /> Ayarlarım
        </h1>
        <span className="font-semibold text-primary">{user.displayName}</span>
      </div>

      <div className="p-3 border rounded-md shadow-lg flex flex-col gap-1 w-44">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500">Maaş Günü</span>
          <div className="border flex items-center justify-center gap-x-5 px-4 h-10 rounded-md">
            <label>
              <IoReloadCircleOutline size={20} />{" "}
            </label>
            <select type="text" className="w-24 outline-none h-full text-sm">
              <option value="">Seçiniz..</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500">Bildirimler</span>
          <div className="border flex items-center justify-center gap-x-5 px-4 h-10 rounded-md">
            <label>
              <TbBell size={20} />{" "}
            </label>
            <select type="text" className="w-24 outline-none h-full text-sm">
              <option value="">Seçiniz..</option>
              <option value={true}>Açık</option>
              <option value={false}>Kapalı</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500">Yakında..</span>
          <div className="border flex items-center justify-center gap-x-5 px-4 h-10 rounded-md">
            <label>
              <TbMoon size={20} />{" "}
            </label>
            <select type="text" className="w-24 outline-none h-full text-sm">
              <option value="">Yakında..</option>
              <option value={true}>Karanlık</option>
              <option value={false}>Aydınlık</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
