import React from "react";

const Error = ({ err }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl">{err || "Something went wrong"}</p>
    </div>
  );
};

export default Error;
