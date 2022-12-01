import React from "react";
import { Link } from "gatsby";
import builder from "../../../sanityClient.js";

function urlFor(source) {
  return builder.image(source);
}

const Cineitem = (props) => {
  const x = props?.featuredImage?.hotspot
    ? props?.featuredImage?.hotspot?.x
    : "0";
  const y = props?.featuredImage?.hotspot
    ? props?.featuredImage?.hotspot?.y
    : "0";

  return (
    <div
      className={
        "w-full md:w-1/2 lg:w-1/3 flex flex-col item__grid relative " +
        props.category
      }
    >
      <div className="relative">
        <Link
          to={`/${props.url}`}
          title={`Read more about ${props.title}`}
          className="absolute inset-0 z-10"
        />
        <picture className={"w-full"}>
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url(${props?.featuredImage?.asset?.metadata?.lqip})`,
              backgroundSize: "cover",
              paddingTop: `calc(100% / 2 * 1)`,
            }}
          ></div>
          <img
            srcSet={[
              urlFor(props?.featuredImage?.asset?.id)
                .size(800, 400)
                .quality(100)
                .focalPoint(x, y)
                .crop("focalpoint")
                .fit("crop")
                .auto("format")
                .url() + " 768w,",
              urlFor(props?.featuredImage?.asset?.id)
                .size(1200, 600)
                .quality(100)
                .focalPoint(x, y)
                .crop("focalpoint")
                .fit("crop")
                .auto("format")
                .url() + " 1536w,",
            ]}
            alt={props?.featuredImage?.alt}
            className="absolute inset-0"
            loading="lazy"
          />
        </picture>
        <div className="hover absolute flex items-center justify-center inset-0">
          <h2 className="uppercase font-semibold px-10 text-center">
            {props.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Cineitem;
