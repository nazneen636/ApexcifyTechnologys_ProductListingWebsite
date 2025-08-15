import React from "react";
import ImageGallery from "../components/productDetails/ImageGallery";
import SpecificProductDetails from "../components/productDetails/SpecificProductDetails";
import { useParams } from "react-router";
import ProductDetailsSkeleton from "../components/Skeleton/ProductDetailsSkeleton";
import { useGetSingleProductQuery } from "../Feature/ProductApi";

// import { useGetSingleProductQuery } from "../../Features/api/product.api";
const ProductDetails = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, error } = useGetSingleProductQuery(id);
  // console.log(data?.category);

  return (
    <div className="container mx-auto mb-20!">
      {!isLoading ? (
        <div className="grid grid-cols-3">
          <div className="col-span-2 mr-16!">
            <ImageGallery images={data?.images} />
          </div>
          <div className="">
            <SpecificProductDetails product={data} />
          </div>
        </div>
      ) : (
        <ProductDetailsSkeleton />
      )}
    </div>
  );
};

export default ProductDetails;
ProductDetails;
