import { useState } from "react";
import { useStripe, useElements, PaymentElement, CardElement } from "@stripe/react-stripe-js";
import '../styles/stripe.module.css'


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };
  message && console.log(message);

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="stripeform">
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit" className="flex bg-yellow-400 my-3 border-yellow-500 items-center justify-items-center px-4 py-2 rounded-md">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
