import Sidebar from "~/components/Sidebar/Sidebar";
import Container from "~/containers/Container";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <Container>
      <Toaster />
      <Sidebar />
      <Outlet />
    </Container>
  );
};

export default Layout;
