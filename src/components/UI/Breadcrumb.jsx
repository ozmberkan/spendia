import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const Breadcrumb = ({ firstLink, secondLink, firstLabel, secondLabel }) => {
  return (
    <div className=" font-medium flex  ">
      <Link
        className={`${
          firstLink
            ? "text-zinc-700 hover:text-zinc-500"
            : "text-zinc-700 hover:text-zinc-500"
        } flex items-center`}
        to={firstLink}
      >
        {firstLabel}{" "}
        <span
          className={
            firstLink && "text-zinc-400 pointer-events-none cursor-none "
          }
        >
          {firstLink && firstLabel && <MdOutlineNavigateNext />}
        </span>{" "}
      </Link>
      <span className={`${firstLink && "text-zinc-400"}`}>{secondLabel}</span>
    </div>
  );
};

export default Breadcrumb;
