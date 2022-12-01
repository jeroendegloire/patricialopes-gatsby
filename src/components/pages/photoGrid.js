import React, { useState, useEffect } from "react";
import Isotope from "isotope-layout/js/isotope";
import Item from "./photoGridItem";
import LightBox from "./lightbox";

const photoGrid = ({ items }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (i) => (e) => {
    setShowLightbox(true);
    setSelectedImage(i);
  };
  const handleClose = () => {
    setShowLightbox(false);
    setSelectedImage(null);
  };
  const handlePrevRequest = (i, length) => (e) => {
    setSelectedImage((i - 1 + length) % length);
  };
  const handleNextRequest = (i, length) => (e) => {
    setSelectedImage((i + 1) % length);
  };

  useEffect(() => {
    var elem = document.querySelector(".photoGrid");
    var iso = new Isotope(elem, {
      itemSelector: ".item--grid",
      layoutMode: "fitRows",
    });
  }, []);

  return items ? (
    <div className="photoGrid mx-auto w-full max-w-6xl pt-10 mx-10 xl:px-0 item mb-20 flex flex-col">
      <div>
        {items.map((item, i) => (
          <button
            onClick={handleOpen(i)}
            className="w-full md:w-1/2 lg:w-1/3 flex flex-col relative item--grid"
            key={i}
          >
            <Item mainImage={item} altImage={item.alt} />
          </button>
        ))}
      </div>
      <div>
        {showLightbox && selectedImage !== null && (
          <LightBox
            images={items}
            handleClose={handleClose}
            handleNextRequest={handleNextRequest}
            handlePrevRequest={handlePrevRequest}
            selectedImage={selectedImage}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default photoGrid;
