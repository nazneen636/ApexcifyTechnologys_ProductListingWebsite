import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import Star from "../commonComponents/Star";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
const SpecificProductDetails = ({ product }) => {
  const {
    title,
    description,
    rating,
    price,
    stock,
    warrantyInformation,
    returnPolicy,
    discountPercentage,
    availabilityStatus,
    reviews,
    shippingInformation,
  } = product;

  const sizes = [
    { id: 1, size: "XS" },
    { id: 2, size: "S" },
    { id: 3, size: "M" },
    { id: 4, size: "L" },
    { id: 5, size: "XL" },
  ];
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="">
        <h2 className="text-2xl font-semibold font-inter text-black">
          {title}
        </h2>
        <div className="flex items-start gap-x-3 mt-4">
          <Star rating={rating} />
          <span className="inline-block text-shadow-black font-normal font-poppins text-md opacity-50">
            {reviews.length} Review
          </span>
          <span className="inline-block  text-black opacity-50"> | </span>
          <span className="inline-block font-normal font-poppins text-md text-green-600">
            {availabilityStatus}
          </span>
        </div>
        <p className="text-2xl font-normal font-inter text-black mt-4">
          $ {(price - (discountPercentage * price) / 100).toFixed(2)}
        </p>

        <h4 className="text-md font-normal font-inter text-black mt-2 border-b-[2px] border-b-gray-300 pb-6 w-full">
          {description}
        </h4>
      </div>

      <div className="flex justify-between items-center">
        {/* qr code */}
        <div className="">
          <div className="flex items-center gap-3 ">
            <h2 className="text-lg  font-normal font-inter text-black">
              Brand:
            </h2>

            <span className="text-base font-normal font-poppins ">
              {product?.brand || "N/A"}
            </span>
          </div>
          <div className="flex  gap-3 mt-1">
            <h2 className="text-lg  font-normal font-inter text-black">
              Tags:
            </h2>

            <span className="text-base font-normal font-poppins capitalize ">
              {product?.tags?.join(", ")}
            </span>
          </div>
        </div>
        <div className="w-20 h-20 ">
          <img src={product?.meta?.qrCode} alt={product.qrCode} />
        </div>
      </div>
      {/* button */}
      <div className=" flex items-center  justify-between">
        <div className="flex items-center">
          <span className="px-4 py-2 border-2 border-gray-300 rounded-l-lg text-[20px] font-poppins text-black cursor-pointer hover:bg-red-400 hover:text-white">
            -
          </span>
          <span className="px-6 py-2 border-2 border-gray-300  text-[20px] font-poppins text-black border-l-0 cursor-pointer hover:bg-red-400 hover:text-white">
            2
          </span>
          <span className="px-4 py-2 border-2 border-gray-300 rounded-r-lg text-[20px] font-poppins text-black border-l-0 cursor-pointer hover:bg-red-400 hover:text-white">
            +
          </span>
        </div>

        <button className="py-3 px-10 bg-red-400 rounded-[5px] border-none font-poppins font-medium text-white text-base">
          Buy Now
        </button>

        <div className="border-2 border-gray-300 rounded  py-1 px-3 cursor-pointer hover:bg-red-400 hover:text-white ">
          <span className="inline-block text-3xl font-bold  font-poppins  w-full h-full ">
            <IoIosHeartEmpty />
          </span>
        </div>
      </div>
      {/* button */}
      {/* condition  */}
      <div className="">
        <div className="flex items-center gap-x-5 border border-gray-300 px-14 py-4 w-full">
          <span className="text-3xl">
            <TbTruckDelivery />
          </span>
          <div>
            <h4 className="text-base  font-medium font-poppins text-black">
              Shipping info
            </h4>
            <p className="text-base  font-medium font-poppins text-black">
              {shippingInformation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-x-5 border border-gray-300 border-t-0 px-14 py-4 w-full">
          <span className="text-3xl ">
            <HiOutlineRefresh />
          </span>
          <div>
            <h4 className="text-base font-medium font-poppins text-black">
              Return Policy
            </h4>
            <p className="text-sm  font-medium font-poppins text-bl">
              {returnPolicy}
            </p>
          </div>
        </div>
      </div>
      {/* condition  */}
    </div>
  );
};

export default SpecificProductDetails;
