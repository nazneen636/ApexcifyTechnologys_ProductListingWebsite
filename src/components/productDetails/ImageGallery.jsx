import React, { useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

const ImageGallery = ({ images }) => {
  const [initialImage, setInitialImage] = useState(null);

  useEffect(() => {
    if (images?.length) {
      setInitialImage(images[0]);
    }
  }, [images]);

  if (!images?.length) {
    return <p>Loading images...</p>;
  }
  return (
    <div className="h-full">
      <div className="grid grid-cols-4 h-full">
        <div className="grid h-[600px] grid-rows-4 gap-y-4">
          {images.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4! bg-gray-50 shadow rounded-md cursor-pointer overflow-hidden"
              onClick={() => setInitialImage(item)}
            >
              <img
                key={index}
                src={item}
                alt={item}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
        <div className="col-span-3 rounded-md shadow bg-gray-50 border border-gray-200 ml-7! h-[600px]">
          <InnerImageZoom
            src={initialImage}
            zoomSrc={initialImage}
            zoomType="hover"
            className="max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
