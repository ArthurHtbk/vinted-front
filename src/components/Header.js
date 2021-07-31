import vintedLogo from "../assets/images/Vinted_logo.png";
import { Link } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
  return (
    <header>
      <div className="top-bar">
        <Link to="/">
          <img src={vintedLogo} alt="Vinted Logo" className="logo" />
        </Link>
        <form>
          <input type="text" placeholder="Recherche des articles" />
        </form>
        {userToken ? (
          <Link to="/">
            <button>Se déconnecter</button>
          </Link>
        ) : (
          <div>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>{" "}
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        )}
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
