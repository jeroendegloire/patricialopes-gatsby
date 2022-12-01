import React, { useState, useEffect } from "react";

import { Link, graphql } from "gatsby";
import SEO from "../components/seo";
import Layout from "../components/layout/layout";
import { FaAngleLeft } from "react-icons/fa";
import LightBox from "../components/pages/lightbox";
import fallbackImage from "../images/fallback.png";
import builder from "../../sanityClient.js";

function urlFor(source) {
  return builder.image(source);
}

export const query = graphql`
  query cinematoTemplateQuery($id: String!) {
    sanityCinematography(id: { eq: $id }) {
      id
      title
      fragments {
        asset {
          id
          metadata {
            lqip
            dimensions {
              aspectRatio
            }
          }
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
        alt
      }
      awards
      category
      subcategory
      directors
      dops
      shoton
      grading
      production
      linkUrl
      linkText
      linkUrlTwo
      linkTextTwo
      seo {
        seo_title
        meta_description
        focus_synonyms
        focus_keyword
      }
      image {
        asset {
          url
        }
        hotspot {
          x
          y
        }
      }
    }
  }
`;

const ProjectTemplate = ({ data }) => {
  const {
    awards: awards,
    fragments: images,
    directors: directors,
    dops: dops,
    production: productions,
    shoton: shoton,
    grading: grading,
    seo: seo,
    image: image,
  } = data.sanityCinematography;

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
    document.addEventListener("contextmenu", (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  return (
    <Layout>
      <SEO
        keywords={seo?.focus_keyword}
        synonyms={seo?.focus_synonyms}
        image={image?.asset?.url}
        description={seo?.meta_description}
        title={seo?.seo_title}
      />
      <section
        id="cinematography-templete"
        className="bg-white py-6 md:p-10 flex-1"
      >
        <div className="max-w-6xl mx-auto flex items-center flex-wrap relative">
          <Link
            to="/cinematography"
            className="m-0 absolute bottom-0 inline-block left-auto right-2 xl:top-0 xl:-left-6 xl:right-auto"
          >
            <FaAngleLeft size={30} className="inline-block" /> Back
          </Link>

          {images.map((image, i) => (
            <div
              className="mb-4 cinemato-image relative cursor-pointer"
              onClick={handleOpen(i)}
              key={i}
            >
              <picture className={"w-full"}>
                <div
                  aria-hidden="true"
                  style={{
                    backgroundImage: `url(${image.asset.metadata.lqip})`,
                    backgroundSize: "cover",
                    paddingTop: `calc(100% / ${image.asset.metadata.dimensions.aspectRatio})`,
                  }}
                ></div>
                <img
                  src={fallbackImage}
                  srcSet={[
                    urlFor(image?.asset?.id)
                      .width(1000)
                      .quality(100)
                      .auto("format")
                      .url() + " 768w,",
                    urlFor(image?.asset?.id)
                      .width(2000)
                      .quality(100)
                      .auto("format")
                      .url() + " 1536w,",
                  ]}
                  alt={image.alt}
                  className="absolute inset-0"
                  loading="lazy"
                />
              </picture>
            </div>
          ))}
          <div className="font-thin px-6 lg:px-0 mb-8">
            {data.sanityCinematography.title ? (
              <h1 className="font-normal text-xl uppercase text-base mb-4">
                {data.sanityCinematography.title}
              </h1>
            ) : null}

            {data.sanityCinematography.subcategory == "documentary" ? (
              <div className="uppercase mb-4 underline inline-block">Documentary</div>
            ) : null}
            {data.sanityCinematography.subcategory == "commercial" ? (
              <div className="uppercase mb-4 underline inline-block">Commercial</div>
            ) : null}
            {data.sanityCinematography.subcategory == "music_video" ? (
              <div className="uppercase mb-4 underline inline-block">Music video</div>
            ) : null}
            {data.sanityCinematography.subcategory == "series" ? (
              <div className="uppercase mb-4 underline inline-block">Series</div>
            ) : null}
            {data.sanityCinematography.subcategory == "short_film" ? (
              <div className="uppercase mb-4 underline inline-block">Short film</div>
            ) : null}
            {data.sanityCinematography.subcategory == "feature_film" ? (
              <div className="uppercase mb-4 underline inline-block">Feature film</div>
            ) : null}

            {directors[0] ? (
              <div>
                <span className="font-normal">DIRECTED BY: </span>
                {directors
                  .map((director, i) => (
                    <span key={i} className="inline-block">
                      {director}
                    </span>
                  ))
                  .map((director, index) => [index > 0 && ", ", director])}
                <br />
              </div>
            ) : null}

            {productions[0] ? (
              <div>
                <span className="font-normal">PRODUCTION: </span>
                {productions.map((production, i) => (
                  <span key={i} className="inline-block">
                    {production}
                  </span>
                ))}
                <br />
              </div>
            ) : null}

            {dops[0] ? (
              <div>
                <span className="font-normal">CINEMATOGRAPHY: </span>
                {dops
                  .map((dop, i) => (
                    <span key={i} className="inline-block">
                      {dop}
                    </span>
                  ))
                  .map((dop, index) => [index > 0 && ", ", dop])}
                <br />
              </div>
            ) : null}

{grading[0] ? (
              <div className="mb-4">
                <span className="font-normal">GRADING: </span>
                {grading
                  .map((grading, i) => (
                    <span key={i} className="inline-block">
                      {grading}
                    </span>
                  ))
                  .map((grading, index) => [index > 0 && ", ", grading])}
                <br />
              </div>
            ) : null}

            {shoton[0] ? (
              <div>
                <span className="font-normal">SHOT ON: </span>
                {shoton
                  .map((shoton, i) => (
                    <div key={i}>
                      {shoton}
                    </div>
                  ))
                  .map((shoton, index) => [index > 0 && ", ", shoton])}
                <br />
              </div>
            ) : null}

            {awards[0] ? (
              <div>
                <span className="font-normal">FESTIVALS &amp; AWARDS: </span>
                {awards
                  .map((awards, i) => (
                    <div key={i}>
                      {awards}
                    </div>
                  ))
                  .map((awards, index) => [index > 0 && ", ", awards])}
                <br />
              </div>
            ) : null}
            
            {data.sanityCinematography.linkUrl ? (
              <div className="mt-4">
                <Link
                  to={data.sanityCinematography.linkUrl}
                  className="underline hover:no-underline"
                >
                  {data.sanityCinematography.linkText}
                </Link>
                <br />
              </div>
            ) : null}
            {data.sanityCinematography.linkUrlTwo ? (
              <div>
                <Link
                  to={data.sanityCinematography.linkUrlTwo}
                  className="underline hover:no-underline"
                >
                  {data.sanityCinematography.linkTextTwo}
                </Link>
                <br />
              </div>
            ) : null}
            {/* 
            {data.sanityCinematography.text ? (
              <div className="mt-4">
                <PortableText blocks={data.sanityCinematography.text[0]} />
              </div>
            ) : null} */}

            {showLightbox && selectedImage !== null && (
              <LightBox
                images={images}
                handleClose={handleClose}
                handleNextRequest={handleNextRequest}
                handlePrevRequest={handlePrevRequest}
                selectedImage={selectedImage}
              />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectTemplate;
