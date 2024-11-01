import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ firstLink, secondLink, firstLabel, secondLabel }) => {
  return (
    <div className=" mb-5 font-semibold ">
      <Link
        className={`${firstLink ? "text-secondary" : "text-zinc-400"}`}
        to={firstLink}
      >
        {firstLabel}{" "}
        <span
          className={
            firstLink && "text-zinc-400 pointer-events-none cursor-none"
          }
        >
          {firstLink && "/"}
        </span>{" "}
      </Link>
      <Link to={secondLink} className={`${firstLink && "text-zinc-400"}`}>
        {secondLabel}
      </Link>
    </div>
  );
};

export default Breadcrumb;
