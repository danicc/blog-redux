import React from "react";
import { useLocation, Link } from "react-router-dom";

import "./styles.css";

function Header({ props }) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="header">
      <nav>
        <ul className="header-list">
          <li
            className={
              pathname === "/" ? "nav__item nav__item--active" : "nav__item"
            }
          >
            <Link to="/">Users</Link>
          </li>
          <li
            className={
              pathname === "/posts"
                ? "nav__item nav__item--active"
                : "nav__item"
            }
          >
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
