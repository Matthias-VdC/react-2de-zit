import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import SearchIcon from "../assets/SearchIcon";

export default function Header() {
  const [hamburger, setHamburger] = useState("header-hamburger");
  const [header, setHeader] = useState("header");
  const [hovered, setHovered] = useState(false);

  // hovered src: https://www.reddit.com/r/threejs/comments/l63kgm/change_mouse_to_pointer_on_hover_with_react_three/

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY === 0) {
        setHeader("header");
      } else {
        setHeader("header-scroll");
      }
    });
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <header id={header}>
      <div id="header-container">
        <div
          onPointerOver={() => {
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
          id="header-logo-container"
        >
          <img id="header-logo" src={logo} alt="" />
        </div>
        <input id="header-search" type="text" placeholder="Search Reddit" />
        <div
          onPointerOver={() => {
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
          id="header-search-button"
        >
          <SearchIcon />
        </div>
        <div>
          <div
            onClick={(e) => {
              if (hamburger === "header-hamburger") {
                setHamburger("header-hamburger-click");
              } else {
                setHamburger("header-hamburger");
              }
            }}
            id={hamburger}
          >
            <div id="header-hamburger-top" />
            <div id="header-hamburger-mid" />
            <div id="header-hamburger-bot" />
          </div>
        </div>
      </div>
    </header>
  );
}
