import { Link } from "react-router-dom";
import tearEffect from "../assets/images/tear-effect.svg";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <div>
      <div className="hero">
        <img src={tearEffect} alt="" className="tear-effect" />
        <div className="hero-container">
          <div className="call-to-action">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Vends maintenant</button>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Articles populaires</h2>
        <div className="offer">
          {data.offers.map((offer) => {
            return (
              <div key={offer._id} className="card">
                <Link to={`/offer/${offer._id}`}>
                  <img
                    className="offer-img"
                    src={offer.product_image.secure_url}
                    alt={offer.product_name}
                  />
                </Link>
                <h3>{offer.product_price} €</h3>
                <p>{offer.product_details[1].TAILLE}</p>
                <p>{offer.product_details[0].MARQUE}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
