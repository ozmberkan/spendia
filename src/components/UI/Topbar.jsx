import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "./Breadcrumb";
import { toggleSidebar } from "~/redux/slices/sidebarSlice";

const Topbar = ({ firstLabel, firstLink, secondLabel, secondLink }) => {
  const { isOpen } = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();
  const toggleSidebarHandle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="w-full mb-5 flex gap-x-2 items-center">
      <div className="pr-2 border-r flex ">
        <button
          onClick={toggleSidebarHandle}
          className="text-zinc-500 hover:text-zinc-400"
        >
          {isOpen ? (
            <TbLayoutSidebarLeftCollapse size={25} />
          ) : (
            <TbLayoutSidebarLeftExpand size={25} />
          )}
        </button>
      </div>
      <Breadcrumb
        firstLabel={firstLabel}
        firstLink={firstLink}
        secondLabel={secondLabel}
        secondLink={secondLink}
      />
    </div>
  );
};

export default Topbar;
