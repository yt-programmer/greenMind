import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center h-full">
      <span className="w-3 h-3 rounded-full bg-[#074946] animate-bounce [animation-delay:.7s]"></span>
      <span className="w-3 h-3 rounded-full bg-[#074946] animate-bounce [animation-delay:.3s]"></span>
      <span className="w-3 h-3 rounded-full bg-[#074946] animate-bounce [animation-delay:.7s]"></span>
    </div>
  );
};

export default Loading;
