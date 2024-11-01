import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sidebarSlice from "./slices/sidebarSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    sidebar: sidebarSlice,
  },
});
