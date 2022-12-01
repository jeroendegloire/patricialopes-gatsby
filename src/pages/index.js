import React from "react";
import { graphql } from "gatsby";
import Slideshow from "../components/pages/slideShow";
import Layout from "../components/layout/layout";
import Text from "../components/pages/text";
import TextImage from "../components/pages/textImage";
import Grid from "../components/pages/grid";
import Video from "../components/pages/video";
import SEO from "../components/seo";

export const query = graphql`
  query indexPageTemplateQuery {
    route: sanityPage(slug: { current: { eq: "home" } }) {
      id
      title
      _key
      _rawContent(resolveReferences: { maxDepth: 10 })
      image {
        alt
        asset {
          id
          url
        }
      }
      slug {
        current
      }
      seo {
        focus_keyword
        seo_title
        meta_description
        focus_synonyms
      }
    }
    sanitySiteSettings {
      siteTitle: title
    }
  }
`;

const Index = ({ data }) => {
  const page = data.sanityPage || data.route;
  const siteSettings = data.sanitySiteSettings;
  const seo = page.seo;
  const slug = page.slug.current;
  const fixed = slug == "home" ? "lg:fixed" : "";
  const content = (page._rawContent || [])
    .filter((c) => !c.disabled)
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "slideshow":
          el = <Slideshow key={c._key} {...c} key={i} />;
          break;
        case "textContent":
          el = <Text key={c._key} {...c} key={i} />;
          break;
        case "textWithImage":
          el = <TextImage key={c._key} {...c} key={i} />;
          break;
        case "gallery":
          el = <Grid key={c._key} {...c} key={i} />;
          break;
        case "videoEmbed":
          el = <Video key={c._key} {...c} key={i} />;
          break;
        case "contact":
          el = <Contact key={c._key} {...c} key={i} />;
          break;
        case "accordion":
          el = <Accordion key={c._key} {...c} key={i} />;
          break;

        default:
          el = null;
      }
      return el;
    });

  const focus_keywords = seo?.focus_keyword ? seo.focus_keyword : " ";
  const focus_synonyms = seo?.focus_synonyms ? seo.focus_synonyms : " ";

  return (
    <div className={"w-full " + fixed}>
      <Layout>
        <SEO
          keywords={focus_keywords}
          synonyms={focus_synonyms}
          image={page?.image?.asset?.url}
          description={seo?.meta_description}
          title={siteSettings.siteTitle}
          titleTemplate={`%s`}
        />
        <article className="flex-1 flex flex-col">
          <h1 className="sr-only">Patricia Lopes - Director of Photography</h1>
          <p className="sr-only">
            Award winning Patricia Lopes is a Portuguese-Brazilian director of
            photography/cinematographer, who is especially drawn by stories that
            challenge her to think outside of the box. She has lived abroad
            since her childhood, giving her the ability to adapt and explore her
            style to each project solely.
          </p>
          <div className="flex-1 flex">{content}</div>
        </article>
      </Layout>
    </div>
  );
};

export default Index;
