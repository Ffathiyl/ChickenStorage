import React from "react";
import logo from "../../assets/Los_Pollos_Hermanos_logo.png";
import Menu from "./Menu"; // Import komponen Menu

export default function Header() {
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
          <span className="ml-2" style={{ fontSize: "25px", fontFamily: "fantasy", color: "red" }}>Los Pollos Hermanos</span>
        </div>
        <Menu /> {/* Masukkan komponen Menu di sini */}
      </div>
    </div>
  );
}
