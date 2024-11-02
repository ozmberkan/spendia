import { collection, doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { contactsInputs } from "~/data/data";
import { db } from "~/firebase/firebase";
import logoTam from "~/assets/logotam.svg";
import { ring } from "ldrs";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactsScheme } from "~/validation/scheme";
import Breadcrumb from "~/components/UI/Breadcrumb";
import Topbar from "~/components/UI/Topbar";

const Contacts = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactsScheme),
  });

  ring.register();

  const [loading, setLoading] = useState(false);

  const sendContact = async (data) => {
    try {
      setLoading(true);
      const contactRef = doc(collection(db, "contacts"));

      await setDoc(contactRef, {
        contactID: contactRef.id,
        name: data.name,
        email: data.email,
        title: data.title,
        message: data.message,
      });

      toast.success("Mesajınız başarıyla gönderildi.");
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-6 h-full w-full"
    >
      <Topbar
        firstLabel={"Anasayfa"}
        firstLink={"/"}
        secondLabel={"İletişim"}
      />
      <p className="text-zinc-500 font-medium mt-3">
        Bize ulaşmak için aşağıdaki formu doldurabilirsiniz.
      </p>
      <form className="mt-6 " onSubmit={handleSubmit(sendContact)}>
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-col gap-y-5">
            {contactsInputs.map((input) => (
              <div className="flex flex-col gap-y-1">
                <span className="text-sm text-red-500">
                  {errors[input.name] && errors[input.name].message}
                </span>
                <div
                  key={input.id}
                  className={`w-full px-4 h-12 rounded-md border flex items-center gap-x-5 
                   "bg-zinc-100 text-zinc-400" ${
                     errors[input.name] && `border-red-500`
                   }
                   `}
                >
                  <input
                    placeholder={input.placeholder}
                    className=" outline-none w-full h-10 bg-transparent "
                    {...register(input.name)}
                  />
                  <span
                    className={`p-1 rounded-md  text-primary ${
                      errors[input.name] && "text-red-500"
                    }`}
                  >
                    <input.icon size={25} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-secondary hover:text-primary text-secondary rounded-md font-semibold"
          >
            {loading ? (
              <l-ring
                size="24"
                stroke="3"
                bg-opacity="0"
                speed="2"
                color="#80bd3a"
              />
            ) : (
              "Gönder"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Contacts;
