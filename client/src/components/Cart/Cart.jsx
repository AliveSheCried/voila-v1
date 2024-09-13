import { useState } from "react";
import PaymentSelection from "./PaymentSelection";
import ShoppingCart from "./ShoppingCart";
import UserDetailsForm from "./UserDetailsForm";

export default function MainComponent() {
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("bank");
  const [items, setItems] = useState([
    { id: 1, name: "Widget 1", price: 25 },
    { id: 2, name: "Widget 2", price: 35 },
    { id: 3, name: "Widget 3", price: 40 },
  ]);

  const handlePriceChange = (id, newPrice) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
  };

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleNextClick = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBackClick = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="checkout-container">
      {step === 1 && <UserDetailsForm handleNextClick={handleNextClick} />}
      {step === 2 && (
        <ShoppingCart
          items={items}
          handlePriceChange={handlePriceChange}
          total={total}
          handleBackClick={handleBackClick}
          handleNextClick={handleNextClick}
        />
      )}
      {step === 3 && (
        <PaymentSelection
          selectedPayment={selectedPayment}
          handlePaymentChange={handlePaymentChange}
          handleBackClick={handleBackClick}
        />
      )}
    </div>
  );
}
