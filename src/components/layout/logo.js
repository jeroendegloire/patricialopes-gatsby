import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import SvgComponent from "../logo";

function Logo() {
  return (
    <StaticQuery
      query={graphql`
        query LogoQuery {
          sanitySiteSettings {
            id
          }
        }
      `}
      render={(data) => {
        return (
          <Link className="logo" to="/" title="Home">
            <SvgComponent />
          </Link>
        );
      }}
    />
  );
}

export default Logo;
