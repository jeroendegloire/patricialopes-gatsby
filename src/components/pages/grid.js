import React, { useState, useEffect } from "react";
import builder from "../../../sanityClient.js";
import LightBox from "./lightbox";
import PropTypes from "prop-types";
import Isotope from "isotope-layout/js/isotope";

function urlFor(source) {
  return builder.image(source);
}

const Grid = ({ items }) => {
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
    var elem = document.querySelector(".grid");
    var iso = new Isotope(elem, {
      layoutMode: "masonry",
      percentPosition: true,
    });

    elem?.classList.add('isotope-initialized');
  }, []);

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  return items ? (
    <div className="flex items-center flex-wrap flex-1 -mb-4 masonry-wrapper">
      <div className="flex flex-1 grid">
        {items.map((item, i) => (
          <button
            onClick={handleOpen(i)}
            className={"item-grid " + item.ratio}
            key={i}
          >
            {item.ratio == "landscape" && (
              <figure className={"gatsby-image-wrapper"}>
                <picture className={"w-full"}>
                  <div
                    aria-hidden="true"
                    style={{
                      paddingTop: `calc(100% / 2 * 1)`,
                      backgroundImage: `url(${item?.image?.asset?.metadata?.lqip})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <img
                    srcSet={[
                      urlFor(item?.image?.asset?.id)
                        .size(800, 400)
                        .quality(100)
                        .focalPoint(
                          item?.image?.hotspot
                            ? item?.image?.hotspot?.x
                            : "0.5",
                          item?.image?.hotspot ? item?.image?.hotspot?.y : "0.5"
                        )
                        .crop("focalpoint")
                        .fit("crop")
                        .auto("format")
                        .url() + " 768w,",
                      urlFor(item?.image?.asset?.id)
                        .size(1200, 600)
                        .quality(100)
                        .focalPoint(
                          item?.image?.hotspot
                            ? item?.image?.hotspot?.x
                            : "0.5",
                          item?.image?.hotspot ? item?.image?.hotspot?.y : "0.5"
                        )
                        .crop("focalpoint")
                        .fit("crop")
                        .auto("format")
                        .url() + " 1536w,",
                    ]}
                    alt={item?.image?.alt}
                    className="absolute inset-0"
                    loading="lazy"
                  />
                </picture>
              </figure>
            )}
            {item.ratio == "square" && (
              <figure className={"gatsby-image-wrapper"}>
                <picture className={"w-full"}>
                  <div
                    aria-hidden="true"
                    style={{
                      paddingTop: `100%`,
                      backgroundImage: `url(${item?.image?.asset?.metadata?.lqip})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <img
                    srcSet={[
                      urlFor(item?.image?.asset?.id)
                        .size(800, 800)
                        .quality(100)
                        .focalPoint(
                          item?.image?.hotspot
                            ? item?.image?.hotspot?.x
                            : "0.5",
                          item?.image?.hotspot ? item?.image?.hotspot?.y : "0.5"
                        )
                        .crop("focalpoint")
                        .fit("crop")
                        .auto("format")
                        .url() + " 768w,",
                      urlFor(item?.image?.asset?.id)
                        .size(1000, 1000)
                        .quality(100)
                        .focalPoint(
                          item?.image?.hotspot
                            ? item?.image?.hotspot?.x
                            : "0.5",
                          item?.image?.hotspot ? item?.image?.hotspot?.y : "0.5"
                        )
                        .crop("focalpoint")
                        .fit("crop")
                        .auto("format")
                        .url() + " 1536w,",
                    ]}
                    alt={item?.image?.alt}
                    className="absolute inset-0"
                    loading="lazy"
                  />
                </picture>
              </figure>
            )}
            {item.ratio == "portrait" && (
              <figure className={"gatsby-image-wrapper"} style={{}}>
                <picture className={"w-full"}>
                  <div
                    aria-hidden="true"
                    style={{
                      paddingTop: `200%`,
                      backgroundImage: `url(${item?.image?.asset?.metadata?.lqip})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <img
                    srcSet={[
                      urlFor(item?.image?.asset?.id)
                        .size(400, 800)
                        .quality(100)
                        .focalPoint(
                          item?.image?.hotspot
                            ? item?.image?.hotspot?.x
                            : "0.5",
                          item?.image?.hotspot ? item?.image?.hotspot?.y : "0.5"
                        )
                        .crop("focalpoint")
                        .fit("crop")
                        .auto("format")
                        .url() + " 768w,",
                      urlFor(item?.image?.asset?.id)
                        .size(500, 800)
                        .quality(100)
                        .focalPoint(
                          item?.image?.hotspot
                            ? item?.image?.hotspot?.x
                            : "0.5",
                          item?.image?.hotspot ? item?.image?.hotspot?.y : "0.5"
                        )
                        .crop("focalpoint")
                        .fit("crop")
                        .auto("format")
                        .url() + " 1536w,",
                    ]}
                    alt={item?.image?.alt}
                    className="absolute inset-0"
                    loading="lazy"
                  />
                </picture>
              </figure>
            )}
          </button>
        ))}
      </div>
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
  ) : null;
};

Grid.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
};

export default Grid;
