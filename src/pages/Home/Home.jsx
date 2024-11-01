import { useMotionValue, animate } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const count = useMotionValue(0);
  const [formattedValue, setFormattedValue] = useState("0₺");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(value);
  };

  useEffect(() => {
    const controls = animate(count, user.budget, { duration: 1 });

    return () => controls.stop();
  }, [user.budget]);

  useEffect(() => {
    return count.onChange((latest) => {
      setFormattedValue(formatCurrency(Math.round(latest)));
    });
  }, [count]);

  return (
    <div className="p-6 w-full h-full">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-3xl text-primary">{user.displayName}</h1>
        <div className="font-bold text-3xl text-secondary px-4 py-2 rounded-md bg-primary">
          <span>{formattedValue}</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 row-span-2  mt-12 gap-5">
        <div className="bg-primary col-span-1  text-secondary h-[300px] rounded-xl shadow-lg">
          Bütçe Yönetimi
        </div>
        <div className="bg-primary col-span-3  text-secondary h-[300px] rounded-xl shadow-lg">
          Hedef Listesi
        </div>
        <div className="bg-primary col-span-3  text-secondary h-[300px] rounded-xl shadow-lg">
          Deneme
        </div>
        <div className="bg-primary col-span-1  text-secondary h-[300px] rounded-xl shadow-lg">
          Premium Ayarlar
        </div>
      </div>
    </div>
  );
};

export default Home;
