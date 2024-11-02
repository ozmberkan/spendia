import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sidebarSlice from "./slices/sidebarSlice";
import goalsSlice from "./slices/goalsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    sidebar: sidebarSlice,
    goals: goalsSlice,
  },
});
