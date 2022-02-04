import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

import Done from "./Done";

const CheckoutForm = ({ title, price, userToken }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userToken,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://vinted-backend-reacteur.herokuapp.com/payment",
        {
          stripeToken,
          title,
          price,
        }
      );
      console.log(`response.data: ${response.data}`);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return !completed ? (
    <form className="pay-form" onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="buy-button">
        Valider l'achat
      </button>
    </form>
  ) : (
    <Done />
  );
};

export default CheckoutForm;
