import vintedLogo from "../assets/images/Vinted_logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
      <Link
        className="logo-link"
        to="/"
        onClick={() => {
          setShowLinks(false);
        }}
      >
        <img src={vintedLogo} alt="Logo Vinted" className="logo" />
      </Link>
      {userToken ? (
        <ul className="navbar-area">
          <li
            className="navbar-item"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            <Link className="navbar-link white-link" to="/">
              <button
                className="navbar-button white"
                onClick={() => {
                  setUser(null);
                }}
              >
                Se déconnecter
              </button>
            </Link>
          </li>
          <li
            className="navbar-item"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            <Link className="navbar-link" to="/publish">
              <button className="navbar-button blue">Vends tes articles</button>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-area">
          <li
            className="navbar-item"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            <Link className="navbar-link white-link" to="/signup">
              <button className="navbar-button white">S'inscrire</button>
            </Link>
          </li>
          <li
            className="navbar-item"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            <Link className="navbar-link white-link" to="/login">
              <button className="navbar-button white">Se connecter</button>
            </Link>
          </li>
          <li
            className="navbar-item"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            <Link className="navbar-link" to="/publish">
              <button className="navbar-button blue">Vends tes articles</button>
            </Link>
          </li>
        </ul>
      )}
      <button
        className="navbar-burger"
        onClick={() => {
          setShowLinks(!showLinks);
        }}
      >
        <span className="burger-bar"></span>
      </button>
    </nav>
  );
};

export default Header;
