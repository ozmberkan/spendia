import Layout from "~/layout/Layout";
import Home from "~/pages/Home/Home";

export const HomeRoutes = {
  path: "/",
  element: <Layout />,
  children: [{ path: "/", element: <Home /> }],
};
