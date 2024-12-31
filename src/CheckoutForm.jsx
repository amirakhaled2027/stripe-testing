import React, { useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Set your return URL
        return_url: "http://localhost:3000/complete",
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* Link Authentication Element */}
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(event) => setEmail(event.value.email)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location,
          order amount, and currency.&nbsp;
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Preview payment methods by transaction
          </a>
        </p>
      </div>
    </form>
  );
}
