"use client";

import { useState } from "react";
import "./Gallery.scss";
import Image from "next/image";

const Gallery = ({ data }: { data: any }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="property-gallery">
      <div className="main-image-display">
        {data?.gallery?.length ? (
          <Image
            width={812}
            height={438}
            src={data?.gallery[selectedImage]}
            alt="Property Image"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="image-slider-container">
        {Array.isArray(data?.gallery) &&
          data?.gallery?.map((image: string, i: number) => {
            return (
              <div
                className={`slide ${selectedImage === i ? "active" : ""}`}
                key={i}
                onClick={() => setSelectedImage(i)}
              >
                <Image
                  width={160}
                  height={86}
                  src={image}
                  alt="Property Image"
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
