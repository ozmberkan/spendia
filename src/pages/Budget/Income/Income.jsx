import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { db } from "~/firebase/firebase";
import { getAllIncomes } from "~/redux/slices/budgetsSlice";
import { getUserByID } from "~/redux/slices/userSlice";

const Income = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const createIncome = async (data) => {
    try {
      const incomeRef = doc(collection(db, "incomes"));
      const userRef = doc(db, "users", user.uid);

      await setDoc(incomeRef, {
        incomeID: incomeRef.id,
        incomeName: data.incomeName,
        incomeAmount: Number(data.incomeAmount),
        createdUserID: user.uid,
      });

      await updateDoc(userRef, {
        incomes: arrayUnion(incomeRef.id),
        budget: user.budget + Number(data.incomeAmount),
      });

      toast.success("Gelir başarıyla eklendi.");
      dispatch(getAllIncomes({ userID: user.uid }));
      dispatch(getUserByID(user.uid));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span>Gelir Ekle</span>
      <form
        className="flex-col flex gap-y-2"
        onSubmit={handleSubmit(createIncome)}
      >
        <input
          type="text"
          className="px-4 py-2 rounded-md border"
          placeholder="Gelir Adı"
          {...register("incomeName", { required: true })}
        />
        <input
          type="text"
          className="px-4 py-2 rounded-md border"
          placeholder="Gelir Tutarı"
          {...register("incomeAmount", { required: true })}
        />
        <button className="px-2 py-1 bg-primary text-secondary rounded-md">
          Ekle
        </button>
      </form>
    </div>
  );
};

export default Income;
