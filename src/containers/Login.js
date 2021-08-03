import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      );
      if (response.data.token) {
        console.log(response.data.token);
        setUser(response.data.token);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="Adresse email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Se connecter</button>
        {/* <p>{errorMessage}</p> */}
        <Link to="/signup" className="other-form">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </form>
    </div>
  );
};

export default Login;
