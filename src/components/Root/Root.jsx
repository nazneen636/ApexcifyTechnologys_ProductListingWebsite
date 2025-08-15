import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div>
      <p>Navbar</p>
      <Outlet />
    </div>
  );
};

export default Root;
