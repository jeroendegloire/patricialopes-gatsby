import React from "react";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <div className="flex-1 items-center flex">
        <h2 className="text-4xl font-bold inline-block my-8 p-3 mx-auto">
          404 Page not found
        </h2>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
