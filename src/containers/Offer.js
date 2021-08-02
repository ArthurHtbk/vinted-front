import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <div className="offer-container">
      <div className="box1">
        <img src={data.product_image.secure_url} alt={data.product_name} />
      </div>
      <div className="box2">
        <div className="details">
          <h3 className="price">{data.product_price} €</h3>
          <ul>
            {data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              return (
                <li key={index} className="key-value">
                  <span className="key">{keys[0]}</span>
                  <span className="value">{detail[keys[0]]}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="info">
          <h4>{data.product_name}</h4>
          <p>{data.product_description}</p>
          <p className="owner">{data.owner.account.username}</p>
        </div>
        <button>Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
