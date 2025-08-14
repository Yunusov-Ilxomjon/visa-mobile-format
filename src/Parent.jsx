import React, { useState } from "react";
import TripForm from "./TripForm";
import Contract from "./Contract";

export default function Parent() {
  const [price, setPrice] = useState(0); // 0,00 € dan boshlanadi

  const handleCalculate = (days, travelersCount) => {
    const total = days * travelersCount * 10; // to‘g‘ri formula
    setPrice(total);
  };

  return (
    <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
      <TripForm onCalculate={handleCalculate} />
      <Contract price={price} />
    </div>
  );
}
