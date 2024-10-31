import Layout from "~/layout/Layout";
import Home from "~/pages/Home/Home";
import { authLoader } from "~/loader/authLoader";

export const HomeRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
      loader: () => authLoader(["user", "admin"]),
    },
  ],
};
