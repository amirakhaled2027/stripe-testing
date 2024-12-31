import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import "./App.css";
import CheckoutPage from "./CheckoutPage";
import Language from "./components/Language-Theme";
import WalletPaymentForm from "./components/WalletPaymentForm"; 


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51PqRgCRtqOJfXlLvBLq6EuOriKeqGts9vGXR71oUzilHSzl5QSyldao3NkHroFvyqw5Scd40lDttsWNbQX4deo3900bHvUG0FA");
//stripe original: pk_test_51QS6LBG01721Sc7ZuMkfur5pvCd5nVzALbSdPXIGbCD8icWoeQAqcPKs2nJUghJcd9DDTBgW7cAL3Vo5mIgHSdV800BXa28xlz

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
};

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");

  useEffect(() => {
    // Creating PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);



  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <Router>
    <div className="App">
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader, options }} stripe={stripePromise}>
          <Language/>
          <Routes>
            <Route path="/checkout" element={<CheckoutForm dpmCheckerLink={dpmCheckerLink}/>} />
            <Route path="/wallet-payment" element={<WalletPaymentForm />} /> {/* New Route: Just for testing */}
            <Route path="/complete" element={<CompletePage />} />
          </Routes>
  
          {/* Add your standalone Elements component here */}
          <Elements stripe={stripePromise} options={{ clientSecret, appearance, loader }}>
            <CheckoutPage />
          </Elements>
        </Elements>
      )}
    </div>
  </Router>
  
  );
}
