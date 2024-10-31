import Layout from "~/layout/Layout";
import Home from "~/pages/Home/Home";
import { authLoader } from "~/loader/authLoader";
import Profile from "~/pages/Profile/Profile";
import Budget from "~/pages/Budget/Budget";
import Goal from "~/pages/Goal/Goal";
import Settings from "~/pages/Settings/Settings";
import Premium from "~/pages/Premium/Premium";

export const HomeRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/profile",
      element: <Profile />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/budget-management",
      element: <Budget />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/goals",
      element: <Goal />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/settings",
      element: <Settings />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/premium",
      element: <Premium />,
      loader: () => authLoader(["user", "admin"]),
    },
  ],
};
