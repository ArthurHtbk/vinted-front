import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement);
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: title,
        amount: price,
      }
    );
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
    console.log(response.data);
  };

  return !completed ? (
    <form className="pay-form" onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="buy-button">
        Valider l'achat
      </button>
    </form>
  ) : (
    <div className="done">
      <p>Paiement validé !</p>
    </div>
  );
};

export default CheckoutForm;
