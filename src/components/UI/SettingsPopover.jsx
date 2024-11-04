import { useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { IoReloadCircleOutline } from "react-icons/io5";
import { TbBell, TbMoon, TbSettings } from "react-icons/tb";
import { doc, updateDoc } from "firebase/firestore";
import { FiSave } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { db } from "~/firebase/firebase";

const SettingsPopover = () => {
  const { user } = useSelector((store) => store.user);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      salaryDay: user.salaryDay,
      notificationAllow: user.notificationAllow,
      theme: user.theme,
    },
  });

  const handleUpdateSettings = async (data) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        salaryDay: data.salaryDay,
        notificationAllow: Boolean(data.notificationAllow),
        theme: data.theme,
      });
      toast.success("Ayarlar başarıyla güncellendi.");
    } catch (error) {
      console.error("Ayarları güncellerken hata oluştu: ", error);
    }
  };

  return (
    <Popover className="relative">
      <PopoverButton>
        <TbSettings size={27} />
      </PopoverButton>
      <Transition
        enter="transition duration-300 ease-out"
        enterFrom="opacity-0 translate-y-[-10px]"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-200 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[10px]"
      >
        <PopoverPanel
          anchor="bottom end"
          className="flex flex-col mt-3 z-10 bg-white shadow-xl"
        >
          <form
            className="p-3 border rounded-md shadow-lg flex flex-col gap-1 w-44"
            onSubmit={handleSubmit(handleUpdateSettings)}
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs text-zinc-500">Maaş Günü</span>
              <div className="border flex items-center justify-center gap-x-5 px-4 h-10 rounded-md">
                <label>
                  <IoReloadCircleOutline size={20} />{" "}
                </label>
                <select
                  {...register("salaryDay")}
                  className="w-24 outline-none h-full text-sm"
                >
                  <option value="">Seçiniz..</option>
                  <option value="05">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-zinc-500">Bildirimler</span>
              <div className="border flex items-center justify-center gap-x-5 px-4 h-10 rounded-md">
                <label>
                  <TbBell size={20} />{" "}
                </label>
                <select
                  {...register("notificationAllow")}
                  className="w-24 outline-none h-full text-sm"
                >
                  <option value="">Seçiniz..</option>
                  <option value={true}>Açık</option>
                  <option value={false}>Kapalı</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-zinc-500">Tema</span>
              <div className="border flex items-center justify-center gap-x-5 px-4 h-10 rounded-md">
                <label>
                  <TbMoon size={20} />{" "}
                </label>
                <select
                  className="w-24 outline-none h-full text-sm"
                  {...register("theme")}
                >
                  <option value="">Seçiniz..</option>
                  <option value="dark">Karanlık</option>
                  <option value="light">Aydınlık</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-3 bg-secondary text-primary font-semibold rounded-md px-4 py-2 text-sm flex justify-center items-center gap-1"
            >
              <FiSave />
              Kaydet
            </button>
          </form>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default SettingsPopover;
