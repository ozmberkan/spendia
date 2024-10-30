import Sidebar from "~/components/Sidebar/Sidebar";
import Container from "~/containers/Container";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container>
      <div className="container mx-auto  h-full rounded-[20px] bg-gradient-to-br from-white/80 to-white shadow-xl border border-zinc-300">
        <Outlet />
      </div>
    </Container>
  );
};

export default Layout;
