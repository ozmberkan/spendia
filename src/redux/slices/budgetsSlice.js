import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "~/firebase/firebase";

const initialState = {
  incomes: [],
  expenses: [],
  status: "idle",
};

export const getAllIncomes = createAsyncThunk(
  "incomes/getAllIncomes",
  async ({ userID }, { rejectWithValue }) => {
    try {
      const incomesRef = collection(db, "incomes");

      const q = query(incomesRef, where("createdUser", "==", userID));

      const snapshot = await getDocs(q);

      const incomes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return incomes;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async ({ userID }, { rejectWithValue }) => {
    try {
      const expensesRef = collection(db, "expenses");

      const q = query(expensesRef, where("createdUserID", "==", userID));

      const snapshot = await getDocs(q);

      const expenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return expenses;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllIncomes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllIncomes.fulfilled, (state, action) => {
        state.status = "idle";
        state.incomes = action.payload;
      })
      .addCase(getAllIncomes.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.status = "idle";
        state.expenses = action.payload;
      })
      .addCase(getAllExpenses.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleSidebar } = budgetsSlice.actions;
export default budgetsSlice.reducer;
