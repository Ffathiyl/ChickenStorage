import React, { useState } from "react";
import logo from "../../assets/Los_Pollos_Hermanos_logo.png";
import { ROOT_LINK } from "../../util/Constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.esm";

const arrMenu = [
  { head: "Dashboard", headkey: "dashboard", link: ROOT_LINK + "/", sub: [] },
  {
    head: "Menu",
    headkey: 1,
    link: "#",
    sub: [
      { title: "Show Menu", link: ROOT_LINK + "/Menu" },
      { title: "Add Menu", link: ROOT_LINK + "/MenuAdd" },
    ],
  },
  {
    head: "Order",
    headkey: 2,
    link: "#",
    sub: [
      { title: "Create Order", link: ROOT_LINK + "/Order" },
      { title: "Order on Process", link: ROOT_LINK + "/OrderOnProcess" },
      { title: "History Order", link: ROOT_LINK + "/HistoryOrder" },
    ],
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    console.log(menu);
    setIsOpen(false); // Close dropdown when menu is clicked
  };

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top border-bottom">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo AstraTech"
            className="p-3"
            style={{ height: "70px" }}
          />
          <span
            className="ml-2"
            style={{ fontSize: "25px", fontFamily: "fantasy", color: "red" }}
          >
            Chicken Storage
          </span>
        </div>
        <div
          className={`collapse navbar-collapse justify-content-end pe-4 ${
            isOpen ? "show" : ""
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            {arrMenu.map((menu) => (
              <li
                className="nav-item mx-4"
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "red",
                }}
                key={menu.headkey}
              >
                {menu.sub.length > 0 ? (
                  <div className="dropdown">
                    <a
                      className={`nav-link dropdown-toggle ${
                        activeMenu === menu.head ? "active" : ""
                      }`}
                      href={menu.link}
                      role="button"
                      onClick={() => handleMenuClick(menu.head)}
                      aria-expanded="false"
                      aria-haspopup="true"
                      id={`dropdown-${menu.headkey}`}
                      data-bs-toggle="dropdown"
                    >
                      {menu.head}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdown-${menu.headkey}`}
                    >
                      {menu.sub.map((subMenu, index) => (
                        <li key={index}>
                          <a className="dropdown-item" href={subMenu.link}>
                            {subMenu.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a
                    className={`nav-link ${
                      activeMenu === menu.head ? "active" : ""
                    }`}
                    href={menu.link}
                    onClick={() => handleMenuClick(menu.head)}
                  >
                    {menu.head}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
