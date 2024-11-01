import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ firstLink, secondLink, firstLabel, secondLabel }) => {
  return (
    <div className="py-2 ">
      <Link
        className={`${firstLink ? "text-blue-500" : "text-zinc-700"}`}
        to={firstLink}
      >
        {firstLabel}{" "}
        <span
          className={
            firstLink && "text-zinc-700 pointer-events-none cursor-none"
          }
        >
          {firstLink && "/"}
        </span>{" "}
      </Link>
      <Link to={secondLink} className={`${firstLink && "text-zinc-700"}`}>
        {secondLabel}
      </Link>
    </div>
  );
};

export default Breadcrumb;
