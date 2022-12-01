const path = require(`path`);

exports.createPages = async ({ graphql, getNode, actions }) => {
  const { createPage } = actions;
  const queryResult = await graphql(`
    query {
      cinematographies: allSanityCinematography(
        filter: { slug: { current: { ne: null } } }
      ) {
        nodes {
          id
          slug {
            current
          }
        }
      }
      pages: allSanityPage(filter: { slug: { current: { ne: null } } }) {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);
  nodePages = queryResult.data.pages.nodes;
  nodePages.forEach((node) => {
    createPage({
      path: node.slug.current,
      component: path.resolve(`./src/templates/pages.js`),
      context: { id: node.id },
    });
  });

  nodeCinematographies = queryResult.data.cinematographies.nodes;
  nodeCinematographies.forEach((node) => {
    createPage({
      path: `cinematography/${node.slug.current}`,
      component: path.resolve(`./src/templates/cinemato.js`),
      context: { id: node.id },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          // {
          //   exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js(x)?$/],
          //   test: /\.js(x)?$/,
          //   use: [{ loader: "babel-loader" }],
          // },
          {
            test: /isotope-layout/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

// exports.onCreateDevServer = ({ app }) => {
//   app.get("/", function (req, res) {
//     res.send("Hello");
//   });
// };
