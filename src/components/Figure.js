import React from "react";
import Img from "gatsby-image";
import { getFluidGatsbyImage } from "gatsby-source-sanity";

const sanityConfig = { projectId: "l2xxtj60", dataset: "production" };

export default ({ node }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }
  const fluidProps = getFluidGatsbyImage(
    node.asset._id,
    { maxWidth: 675 },
    sanityConfig
  );
  return (
    <figure>
      <Img fluid={fluidProps} alt={node.alt} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  );
};
