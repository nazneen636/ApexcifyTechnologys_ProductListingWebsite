import React from "react";
import { Link, useLocation } from "react-router";

const BreadCrumb = () => {
  const { pathname } = useLocation();
  const pathNameArr = pathname.split("/").filter((path) => path);
  let BreadCrumbPath = "";

  return (
    <div className="py-5 container flex text-red-400">
      <span>
        <Link to="/" className="">
          Home
          <span className=" px-3">/</span>
        </Link>
      </span>
      <span className="">
        {pathNameArr?.map((name, index) => {
          BreadCrumbPath += `/${name}`;
          const isLast = index === pathNameArr?.length - 1;
          return isLast ? (
            <span key={index} className="  font-poppins capitalize">
              {name}
            </span>
          ) : (
            <Link
              key={index}
              to={BreadCrumbPath}
              className=" font-poppins  mx-2! rounded-sm  gap-3 capitalize"
            >
              {name}
              <span className=" pl-3!">/</span>
            </Link>
          );
        })}
      </span>
    </div>
  );
};

export default BreadCrumb;
