import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import IntentForm from "./SetupForm";
import getStripe from "../utils/getStripe";
import { useSelector } from "react-redux";
import { cartTotal } from "../redux/cartSlice";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentpaymentIntentId] = useState("");
  const cartTotals = useSelector(({cart}) => cartTotal(cart.items));

  useEffect(() => {
    setStripePromise(getStripe());
  }, []);

  useEffect(() => {
    fetch("/api/payment_intents", {
      method: "POST",
      body: JSON.stringify({
        amount: cartTotals['totalPrice'] * 1.15, 
        description: "Payment for items in cart", 
        metadata: JSON.stringify(cartTotals),
        payment_intent_id: paymentIntentId,
      }),
    }).then(async (result) => {
      var { clientSecret, id } = await result.json();
      setClientSecret(clientSecret);
      setPaymentpaymentIntentId(id);
    });
    // setStripePromise(getStripe());
    
  }, []);

  return (
    <div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }} key={clientSecret}>
          <IntentForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
