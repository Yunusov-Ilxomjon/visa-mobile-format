import React from "react";
import { Routes, Route } from "react-router-dom";
import LanguageSelect from "./LanguageSelect";
import './App.css';
import TripForm from './TripForm';
import Contract from './Contract';
import DataTravel from "./DataTravel";
import Payment from "./components/Payment";
import Success from './components/Success';
import Failed from './components/Failed';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failed" element={<Failed />} />
    </Routes>
  );
}

function HomePage() {
  const [price, setPrice] = React.useState(0);
  const contractRef = React.useRef(null);

  const handleCalculate = (days, travelersCount) => {
    const total = days * travelersCount * 10;
    setPrice(total);
    if (contractRef.current) {
      contractRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='insurance-container'>
      <div className="header">
        <div className="logo">
          <img width={68} height={33} src="/logo.png" alt="" />
          <img width={72} height={18} src="/location.png" alt="" />
        </div>

        <div className="lang">
          <a href="tel: +998936993668">
            <img width={32} src="/call.png" alt="" />
          </a>
          <LanguageSelect />
        </div>
      </div>

      <div className='trip-date'>
        <h1 style={{
          fontSize: '26px', color: 'white', fontWeight: '700',
          fontFamily: 'sans-serif', textAlign: 'center', width: '230px'
        }}>
          Insurance for visa to Russia
        </h1>

        <TripForm onCalculate={handleCalculate} />
        <div ref={contractRef}>
          <Contract price={price} />
        </div>

        <DataTravel />
      </div>
    </div>
  );
}
