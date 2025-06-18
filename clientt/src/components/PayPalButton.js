import React, { useEffect, useRef } from "react";

const PayPalButton = ({ total, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal) {
      // Retry pas 200ms nëse SDK s'është ngarkuar ende
      const timer = setTimeout(() => {
        if (window.paypal) {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total.toString(),
                      currency_code: "EUR",
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              onSuccess(order);
            },
            onError: (err) => {
              alert("Dështoi pagesa me PayPal!");
            }
          }).render(paypalRef.current);
        }
      }, 200);

      return () => clearTimeout(timer);
    } else {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toString(),
                  currency_code: "EUR",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          onSuccess(order);
        },
        onError: (err) => {
          alert("Dështoi pagesa me PayPal!");
        }
      }).render(paypalRef.current);
    }
  }, [total, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
