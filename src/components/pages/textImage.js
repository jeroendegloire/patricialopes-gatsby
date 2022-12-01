import React from "react";
import PortableText from "../portableText";
import { Link } from "gatsby";
import Footer from "../layout/footer";
import builder from "../../../sanityClient.js";

function urlFor(source) {
  return builder.image(source);
}

const TextImage = ({ image, text }) => {
  const x = image?.hotspot ? image?.hotspot?.x : "0.5";
  const y = image?.hotspot ? image?.hotspot?.y : "0.5";

  return (
    image,
    text ? (
      <div className="flex flex-wrap flex-col w-full">
        <div className="w-full">
          <figure className="gatsby-image-wrapper w-full">
            <picture className={"w-full"}>
              <div
                className={"absolute inset-0"}
                style={{
                  backgroundSize: "cover",
                  backgroundImage: `url(${image?.asset?.metadata?.lqip})`,
                }}
              ></div>
              <img
                srcSet={
                  urlFor(image?.asset?.id)
                    .width(420)
                    .height(210)
                    .quality(100)
                    .auto("format")
                    .url() +
                  ` 420w,` +
                  urlFor(image?.asset?.id)
                    .width(800)
                    .height(400)
                    .quality(100)
                    .auto("format")
                    .url() +
                  ` 800w,` +
                  urlFor(image?.asset?.id)
                    .size(1920, 600)
                    .fit("crop")
                    .crop("focalpoint")
                    .focalPoint(x, y)
                    .auto("format")
                    .quality(100)
                    .url() +
                  ` 1920w`
                }
                loading="lazy"
                className={"relative"}
                alt={image?.alt}
                width="1920"
                height="600"
              />
            </picture>
          </figure>
        </div>

        <div className="mx-auto w-full flex max-w-6xl flex flex-col md:flex-row pt-10 px-10 xl:px-0">
          {text ? (
            <div className="md:w-2/3">
              {text.map((singleText) => (
                <PortableText blocks={singleText} />
              ))}
            </div>
          ) : null}
          <div className="flex flex-col self-end md:w-1/3 mb-5">
            <Link to="/contact" className="btn block self-end">
              Contact me
            </Link>
            <Footer />
          </div>
        </div>
      </div>
    ) : null
  );
};

export default TextImage;
