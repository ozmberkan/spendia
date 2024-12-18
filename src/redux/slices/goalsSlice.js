import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "~/firebase/firebase";

const initialState = {
  goals: [],
  completedGoals: [],
  status: "idle",
  errorMessage: "",
};

export const getAllGoals = createAsyncThunk(
  "goals/getAllGoals",
  async ({ userID }, { rejectWithValue }) => {
    try {
      const goalsRef = collection(db, "goals");
      const q = query(goalsRef, where("createdUserID", "==", userID));
      const goalsSnapShot = await getDocs(q);
      const goals = goalsSnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return goals;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getAllCompleteGoals = createAsyncThunk(
  "goals/getAllCompleteGoals",
  async ({ userID }, { rejectWithValue }) => {
    try {
      const goalsRef = collection(db, "completeGoals");
      const q = query(goalsRef, where("completedUserID", "==", userID));
      const goalsSnapShot = await getDocs(q);
      const completedGoals = goalsSnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return completedGoals;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.goals = action.payload;
      })
      .addCase(getAllGoals.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
      })
      .addCase(getAllCompleteGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCompleteGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.completedGoals = action.payload;
      })
      .addCase(getAllCompleteGoals.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
      });
  },
});

export const { toggleSidebar } = goalsSlice.actions;
export default goalsSlice.reducer;
