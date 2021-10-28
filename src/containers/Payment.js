import { Redirect } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = ({ userToken }) => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  const buyerFees = (Math.round(0.4 * 100) / 100).toFixed(2);
  const deliveryFees = (Math.round(0.8 * 100) / 100).toFixed(2);
  const total = (Math.round((1.2 + price) * 100) / 100).toFixed(2);
  // console.log(title);
  // console.log(price);
  // console.log(buyerFees);
  // console.log(deliveryFees);
  // console.log(total);

  return userToken ? (
    <div className="payment-container">
      <div className="payment-box">
        <p className="small-grey">Résumé de la commande</p>
        <div className="sum-up">
          <span>Commande</span>
          <span>
            <b>{price} €</b>
          </span>
        </div>
        <div className="sum-up">
          <span>Frais protection acheteurs</span>
          <span>
            <b>{buyerFees} €</b>
          </span>
        </div>
        <div className="sum-up">
          <span>Frais de port</span>
          <span>
            <b>{deliveryFees} €</b>
          </span>
        </div>
      </div>
      <div className="payment-box">
        <div className="total">
          <span>
            <b>Total</b>
          </span>
          <span>
            <b>{total} €</b>
          </span>
        </div>
        <p className="last-step">
          Il ne vous reste plus qu'une étape pour vous offrir <b>{title}</b>.
          Vous allez payer <b>{total} €</b> (frais de protection et frais de
          port inclus).
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} price={total} />
        </Elements>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Payment;
