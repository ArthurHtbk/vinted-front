import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Done = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="done">
      <p>Paiement validé !</p>
    </div>
  );
};

export default Done;
