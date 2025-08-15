const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto animate-pulse h-full">
      <div className="grid grid-cols-3 gap-8">
        {/* Left side: thumbnails + main image */}
        <div className="col-span-2 flex gap-4">
          {/* Thumbnails */}
          <div className="grid grid-rows-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-28 h-28 bg-gray-200 rounded-md"></div>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 bg-gray-200 rounded-md h-[500px]"></div>
        </div>

        {/* Right side: product info */}
        <div className="space-y-4 ">
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>

          {/* Ratings */}
          <div className="flex gap-2  mt-4!">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>

          {/* Price */}
          <div className="h-6 w-24 bg-gray-200 rounded  mt-4!"></div>

          {/* Description */}
          <div className="space-y-2 mt-4!">
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>

          {/* Colours */}
          <div className="flex gap-2 mt-5!">
            {[1, 2].map((i) => (
              <div key={i} className="w-6 h-6 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          {/* Sizes */}
          <div className="flex gap-2 mt-6!">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Quantity + Buy button */}
          <div className="flex gap-2 mt-6!">
            <div className="w-24 h-10 bg-gray-200 rounded"></div>
            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
          </div>

          {/* Delivery info */}
          <div className="space-y-2 mt-6!">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
