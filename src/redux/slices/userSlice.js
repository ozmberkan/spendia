import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "~/firebase/firebase";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
};

export const registerService = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        currentBudget: 0,
        monthlyBudget: 0,
        role: "user",
        premium: false,
      };

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, userData);
      return userData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const loginService = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: userDoc.data().displayName,
        phoneNumber: userDoc.data().phoneNumber,
        monthlyBudget: userDoc.data().monthlyBudget,
        currentBudget: userDoc.data().currentBudget,
        role: userDoc.data().role,
        premium: userDoc.data().premium,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserByID = createAsyncThunk(
  "user/getUserByID",
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      return userDoc.data();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
