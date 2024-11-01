import React from "react";
import { infinity } from "ldrs";

const Loader = () => {
  infinity.register();
  return (
    <div className="w-full flex-grow flex justify-center items-center">
      <l-infinity
        size="200"
        stroke="10"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3"
        color="#80bd3a"
      />
    </div>
  );
};

export default Loader;
