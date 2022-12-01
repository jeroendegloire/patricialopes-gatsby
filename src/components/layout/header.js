import React, { useState } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Logo from "./logo";
import { FaTimes } from "react-icons/fa";
import onClickOutside from "react-onclickoutside";

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  Header.handleClickOutside = () => toggleExpansion(false);

  return (
    <StaticQuery
      query={graphql`
        query NavigationQuery {
          sanityNavigationMenu(title: { eq: "mainMenu" }) {
            items {
              link
              name
            }
          }
        }
      `}
      render={(data) => {
        const { items: items } = data.sanityNavigationMenu;
        return (
          <header className="flex flex-wrap justify-between p-8 mx-auto w-full mb-2">
            <Logo />
            <button
              className={`${isExpanded ? `open` : `closed`} block lg:hidden`}
              onClick={() => toggleExpansion(!isExpanded)}
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className={`${isExpanded ? `hidden` : `block`}`}
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <FaTimes
                size="20"
                className={`${isExpanded ? `block` : `hidden`}`}
              />
            </button>
            <nav
              id="nav"
              className={`${
                isExpanded ? `block` : `hidden`
              } lg:block self-end font-medium uppercase text-sm -mb- py-8 lg:py-0 w-full text-center lg:w-auto main-menu`}
            >
              <ul>
                {items.map((item, i) => (
                  <li key={i} className="block lg:inline-block">
                    <Link
                      className="inline-block pb-1 mt-4 lg:mt-0 lg:ml-8 text-center no-underline relative tracking-wider"
                      key={item.name}
                      to={item.link}
                      activeClassName="is-active"
                      onClick={() => toggleExpansion(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
        );
      }}
    />
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Header.handleClickOutside,
};

export default onClickOutside(Header, clickOutsideConfig);
