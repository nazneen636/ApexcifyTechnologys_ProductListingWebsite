import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductCardList from "../commonComponents/ProductCard";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleLine } from "react-icons/ri";
import { TbCirclesRelation } from "react-icons/tb";

export default function RelatedProducts({ data = [] }) {
  return (
    <div className="mt-16 relative">
      <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">
        {" "}
        <TbCirclesRelation className="text-red-400" />
        Related Products
      </h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={{ nextEl: ".next", prevEl: ".prev" }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data?.map((item, index) => (
          <SwiperSlide>
            <ProductCardList key={item.id || index} itemData={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* arrow */}
      <div className="prev text-2xl text-green-700 bg-green-100 w-fit p-1 rounded hover:text-red-500 transition-all absolute top-0 right-10 hover:bg-red-100">
        <RiArrowLeftDoubleFill />
      </div>
      <div className="next text-2xl text-green-700 bg-green-100 w-fit p-1 rounded hover:text-red-500 transition-all absolute top-0 right-0 hover:bg-red-100">
        <RiArrowRightDoubleLine />
      </div>
    </div>
  );
}
