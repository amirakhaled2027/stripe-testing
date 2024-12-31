import React, { useState } from "react";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";

function WalletPaymentForm() {
    const elements = useElements();
    const stripe = useStripe();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!elements || !stripe) {
            setMessage("Stripe.js has not loaded yet.");
            return;
        }

        try {
            // Validate and submit the form fields
            const result = await elements.submit();

            if (result.error) {
                // Handle errors during form submission
                setMessage(`Error: ${result.error.message}`);
            } else {
                // Proceed with the selected payment method
                console.log("Selected Payment Method:", result.selectedPaymentMethod);
                setMessage(`Payment Method Selected: ${result.selectedPaymentMethod}`);
            }
        } catch (error) {
            setMessage(`Unexpected Error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit">Submit Payment</button>
            {message && <div className="message">{message}</div>}
        </form>
    );
}

export default WalletPaymentForm;
