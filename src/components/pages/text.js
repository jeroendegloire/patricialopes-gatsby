import React from "react";
import PortableText from "../portableText";

const Text = ({ text }) => {
  return text ? (
    <div className="container max-w-6xl mx-auto">
      {text.map((singleText) => (
        <PortableText blocks={singleText} />
      ))}
    </div>
  ) : null;
};

export default Text;
