import Layout from "~/layout/Layout";
import Home from "~/pages/Home/Home";
import { authLoader } from "~/loader/authLoader";
import Profile from "~/pages/Profile/Profile";
import Goal from "~/pages/Goal/Goal";
import Settings from "~/pages/Settings/Settings";
import Premium from "~/pages/Premium/Premium";
import Contacts from "~/pages/Contacts/Contacts";
import History from "~/pages/History/History";
import Incomes from "~/pages/Incomes/Incomes";
import Expenses from "~/pages/Expenses/Expenses";

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
      path: "/contacts",
      element: <Contacts />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/premium",
      element: <Premium />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/history",
      element: <History />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/incomes",
      element: <Incomes />,
      loader: () => authLoader(["user", "admin"]),
    },
    {
      path: "/expenses",
      element: <Expenses />,
      loader: () => authLoader(["user", "admin"]),
    },
  ],
};
