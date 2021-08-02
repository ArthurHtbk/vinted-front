import vintedLogo from "../assets/images/Vinted_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ userToken, setUser }) => {
  return (
    <header>
      <div className="top-bar">
        <Link to="/">
          <img src={vintedLogo} alt="Vinted Logo" className="logo" />
        </Link>
        <form>
          <input type="text" placeholder="Recherche des articles" />
          <FontAwesomeIcon icon="search" className="searchIcon" />
        </form>
        {userToken ? (
          <Link to="/">
            <button onClick={() => setUser(null)} className="logout">
              Se déconnecter
            </button>
          </Link>
        ) : (
          <div className="login-buttons">
            <Link to="/signup">
              <button className="signup">S'inscrire</button>
            </Link>{" "}
            <Link to="/login">
              <button className="login">Se connecter</button>
            </Link>
          </div>
        )}
        <div className="sell-button">
          <Link to="/publish">
            <button className="sell">Vends tes articles</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
