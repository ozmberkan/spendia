import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sidebarSlice from "./slices/sidebarSlice";
import goalsSlice from "./slices/goalsSlice";
import budgetsSlice from "./slices/budgetsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    sidebar: sidebarSlice,
    goals: goalsSlice,
    budgets: budgetsSlice,
  },
});
