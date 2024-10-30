import Sidebar from "~/components/Sidebar/Sidebar";
import Container from "~/containers/Container";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container>
      {/* <Sidebar /> */}
      <Outlet />
    </Container>
  );
};

export default Layout;
