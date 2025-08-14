import React, { useState, useRef } from "react";
import LanguageSelect from "./LanguageSelect";
import './App.css'
import TripForm from './TripForm';
import Contract from './Contract';
import Parent from './Parent';
import DataTravel from "./DataTravel";

const App = () => {
  const [price, setPrice] = useState(0);
  const contractRef = useRef(null); // Contract div uchun ref

  const handleCalculate = (days, travelersCount) => {
    const total = days * travelersCount * 10; // To‘g‘ri formula
    setPrice(total);

    // Scroll qilish
    if (contractRef.current) {
      contractRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='insurance-container'>
      {/* ---------- HEADER ---------- */}
      <div className="header">
        <div className="logo">
          <img width={68} src="/logo.png" alt="" />
          <img width={72} src="/location.png" alt="" />
        </div>

        <div className="lang">
          <a href="tel: +998936993668">
            <img width={32} src="/call.png" alt="" />
          </a>
          <LanguageSelect />
        </div>
      </div>

      {/* ---------- TRIP DATE ---------- */}
      <div className='trip-date'>
        <h1 style={{
          fontSize: '26px', color: 'white', fontWeight: '700',
          fontFamily: 'sans-serif', textAlign: 'center', width: '230px'
        }}>
          Insurance for visa to Russia
        </h1>

        <TripForm onCalculate={handleCalculate} />

        {/* Contract joyi */}
        <div ref={contractRef}>
          <Contract price={price} />
        </div>

        <DataTravel/>


      </div>
    </div>
  );
}

export default App;
