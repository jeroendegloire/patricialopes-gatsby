import React from "react";
import Footer from "../layout/footer";
import builder from "../../../sanityClient";

function urlFor(source) {
  return builder.image(source);
}

const Contact = ({ background, title, phone, vat, mail }) => {
  return background && title && phone && vat && mail ? (
    <div className="contact flex flex-1 lg:flex-initial items-center justify-center relative p-5 md:p-0 w-full contact-wrapper">
      <div>
        <div className="absolute inset-0">
          <picture className={"w-full"}>
            <div
              aria-hidden="true"
              style={{
                paddingTop: `41.7%`,
                backgroundImage: `url(${background.asset?.metadata?.lqip})`,
                backgroundSize: `cover`,
              }}
            ></div>
            <source
              srcSet={urlFor(background?.asset?.id)
                .width(800)
                .height(333)
                .quality(100)
                .auto("format")
                .url()}
              width="800"
              height="333"
              media="(max-width:768px)"
            />
            <img
              src={urlFor(background?.asset?.id)
                .width(1920)
                .height(800)
                .quality(100)
                .auto("format")
                .url()}
              loading="lazy"
              width="1920"
              height="800"
              className="absolute inset-0"
              alt={background.alt}
              aria-hidden='true'
            />
          </picture>
        </div>

        <div className="bg-white inline-block p-10 md:p-20 border contact text-center z-10 border-black md:px-32 relative">
          <div className="mb-10 -mt-10">
            <Footer />
          </div>
          <h2 className="uppercase mb-8 relative">{title}</h2>
          <div className="my-2">
            <b>Email: </b>
            <a href="mailto:hello@patricialopes.be" title="Send me">
              {mail}
            </a>
          </div>
          <div className="my-2">
            <b>Phone: </b>
            <a href="tel:0032491204171" title="Call me">
              {phone}
            </a>
          </div>
          <div className="my-2">
            <b>VAT number: </b>
            {vat}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Contact;
