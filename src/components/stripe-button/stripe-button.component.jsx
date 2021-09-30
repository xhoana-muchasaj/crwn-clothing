import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JdD2WHvI25DBUBIYd5dIlRN20LDzzqdXVNVqniKQqL8AOiE1ebCgMcWpTaAzlbDAgJGj6kgAEjDyIy7D68UoJlA00O3Vrr4vF";

  const onToken = (token) => {
    console.log(token);
    alert("Successful payment");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Money"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

// https://github.com/azmenak/react-stripe-checkout