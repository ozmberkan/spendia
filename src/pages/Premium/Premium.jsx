import React from "react";
import bg from "~/assets/premium/bg.svg";

import { motion } from "framer-motion";
import { WiStars } from "react-icons/wi";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const buyToPremium = async () => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        premium: true,
      });

      toast.success("Başarıyla Premium Üyeliğe Geçtiniz");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full  h-full flex justify-center items-center relative"
    >
      <img src={bg} className="z-0 absolute top-0" />

      <div className="w-[650px]  bg-white shadow-2xl rounded-xl z-10 px-4 py-7 flex justify-start items-center flex-col">
        <div className="font-bold text-5xl bg-clip-text text-transparent from-[#3ac396] to-primary bg-gradient-to-l relative ">
          <WiStars
            size={65}
            className="text-primary absolute -top-3 right-0 z-0"
          />
          <span className="z-20">Premium</span>
        </div>
        <span className="text-sm mt-4 text-center">
          Premium üyelik, standart hizmetin ötesine geçerek, kullanıcılara
          benzersiz ve özel bir deneyim sunar. Sadece bir defa ödenecek olan bu
          üyelikle, birçok ayrıcalıktan yararlanabilirsiniz. İşte premium
          üyeliğin bazı avantajları
        </span>
        <hr className="w-full h-px mt-3" />
        <div className="w-full gap-4 mt-8 grid grid-cols-4">
          <motion.span
            className="px-4 shadow font-medium shadow-primary py-1 col-span-2 flex justify-center items-center rounded-full border-2 border-primary text-primary"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            Öncelikli Finansal Destek
          </motion.span>
          <motion.span
            className="px-4 shadow font-medium shadow-secondary py-1 col-span-2 flex justify-center items-center rounded-full border-2 border-secondary text-secondary"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Banka Seçim Ekranı
          </motion.span>
          <motion.span
            className="px-4 shadow font-medium shadow-primary py-1 col-span-3 flex justify-center items-center rounded-full border-2 border-primary text-primary"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            İleri Düzey Raporlama
          </motion.span>
          <motion.span
            className="px-4 shadow font-medium shadow-secondary py-1 flex justify-center items-center rounded-full border-2 border-secondary text-secondary"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hedef +5
          </motion.span>
          <motion.span
            className="px-4 shadow font-medium shadow-primary col-span-1 py-1 flex justify-center items-center rounded-full border-2 border-primary text-primary"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Bildirimler
          </motion.span>
          <motion.span
            className="px-4 shadow font-medium shadow-primary col-span-3 py-1 flex justify-center items-center rounded-full border-2 border-primary text-primary"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Kişiselleştirilebilir Arayüz
          </motion.span>
        </div>
        <div className="w-full p-12 flex drop-shadow-md justify-center items-center text-6xl text-primary font-semibold">
          99.99₺
        </div>
        <button
          onClick={buyToPremium}
          disabled={user.premium === true}
          className={`w-full bg-primary text-secondary px-4 py-2 rounded-md flex justify-center items-center font-semibold ${
            user.premium === true
              ? "hover:bg-secondary hover:text-primary cursor-not-allowed"
              : "hover:bg-primary hover:text-secondary"
          }`}
        >
          {user.premium === true
            ? "Zaten Premium Üyesiniz"
            : "Premium Üyelik Satın Al"}
        </button>
      </div>
    </motion.div>
  );
};

export default Premium;
