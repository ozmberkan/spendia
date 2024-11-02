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
import { getAllExpenses } from "~/redux/slices/budgetsSlice";
import { getUserByID } from "~/redux/slices/userSlice";

const Expenses = () => {
  const { register, handleSubmit, reset } = useForm();

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const createExpenses = async (data) => {
    try {
      const expensesRef = doc(collection(db, "expenses"));
      const userRef = doc(db, "users", user.uid);

      await setDoc(expensesRef, {
        expensesID: expensesRef.id,
        expensesName: data.expensesName,
        expensesAmount: Number(data.expensesAmount),
        createdUserID: user.uid,
      });

      await updateDoc(userRef, {
        expenses: arrayUnion(expensesRef.id),
        budget: user.currentBudget - Number(data.expensesAmount),
      });

      toast.success("Gider başarıyla eklendi.");
      dispatch(getAllExpenses({ userID: user.uid }));
      dispatch(getUserByID(user.uid));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span>Gider Ekle</span>
      <form
        className="flex-col flex gap-y-2"
        onSubmit={handleSubmit(createExpenses)}
      >
        <input
          type="text"
          className="px-4 py-2 rounded-md border"
          placeholder="Gider Adı"
          {...register("expensesName", { required: true })}
        />
        <input
          type="text"
          className="px-4 py-2 rounded-md border"
          placeholder="Gider Tutarı"
          {...register("expensesAmount", { required: true })}
        />
        <button className="px-2 py-1 bg-primary text-secondary rounded-md">
          Ekle
        </button>
      </form>
    </div>
  );
};

export default Expenses;
