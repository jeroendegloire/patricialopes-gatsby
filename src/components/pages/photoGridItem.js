import React from "react";
import builder from "../../../sanityClient.js";

function urlFor(source) {
  return builder.image(source);
}

const photoGridItem = (props) => {
  const placeholder = props?.mainImage?.asset?.metadata?.lqip;

  const x = props?.mainImage?.hotspot ? props?.mainImage?.hotspot?.x : "0.5";
  const y = props?.mainImage?.hotspot ? props?.mainImage.hotspot?.y : "0.5";

  return (
    <picture className={"w-full"}>
      <div
        aria-hidden="true"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${placeholder})`,
          paddingTop: "50%",
        }}
      ></div>
      <img
        srcSet={[
          urlFor(props?.mainImage?.asset?.id)
            .size(800, 400)
            .quality(100)
            .focalPoint(x, y)
            .crop("focalpoint")
            .fit("crop")
            .auto("format")
            .url() + " 768w",
          urlFor(props?.mainImage?.asset?.id)
            .size(1200, 600)
            .quality(100)
            .focalPoint(x, y)
            .crop("focalpoint")
            .fit("crop")
            .auto("format")
            .url() + " 1536w",
        ]}
        alt={props?.mainImage?.alt}
        className="lazy absolute inset-0"
        loading="lazy"
        width="1200"
        height="600"
      />
    </picture>
  );
};

export default photoGridItem;
