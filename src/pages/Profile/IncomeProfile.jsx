import React from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { MdAdd } from "react-icons/md";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const IncomeProfile = () => {
  const { register, handleSubmit, setValue, reset } = useForm();

  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const updateProfileIncomes = async (data) => {
    try {
      const incomesRef = doc(collection(db, "incomes"));

      await setDoc(incomesRef, {
        incomeID: incomesRef.id,
        incomeType: data.incomeType,
        incomeName: data.incomeName,
        incomeAmount: data.incomeAmount,
        createdUser: user.uid,
        createdAt: moment().format("DD.MM.YYYY HH.mm"),
      });

      toast.success("Gelir başarıyla eklendi.");
      navigate("/incomes");
      reset();
    } catch (error) {
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-2 my-5">
      <form
        className="w-full flex flex-col gap-y-5"
        onSubmit={handleSubmit(updateProfileIncomes)}
      >
        <div className="w-full flex justify-start items-center">
          <h1 className="font-semibold text-xl">Gelirlerim</h1>
        </div>
        <div className=" w-full flex items-center justify-start gap-x-5 ">
          <div className="grid grid-cols-3 gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-500">Gelir Tipi</label>
              <select
                placeholder="Gelir Tipi"
                className=" outline-none w-full h-10 bg-transparent border px-4 rounded-md "
                {...register("incomeType")}
              >
                <option value="">Seçiniz..</option>
                <option value="regular">düzenli</option>
                <option value="irregular">düzensiz</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-500">Gelir Adı</label>
              <input
                placeholder="Gelir Adı"
                className=" outline-none w-full h-10 bg-transparent border px-4 rounded-md "
                {...register("incomeName")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-500">Gelir Tutarı</label>
              <NumericFormat
                type="text"
                placeholder="Gelir Tutarı"
                className="px-4 py-2 rounded-md border w-full outline-none"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix="₺"
                onValueChange={(values) =>
                  setValue("incomeAmount", values.floatValue || 0)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span>
              <span className="text-sm text-zinc-500">Ekleyin</span>
            </span>
            <button className="px-4 h-10 flex justify-center items-center rounded-md bg-primary text-secondary">
              <MdAdd size={25} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IncomeProfile;
