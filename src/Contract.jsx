import React, { useState } from 'react';
import './contract.css';

const Contract = ({ price }) => {
  const [showAll, setShowAll] = useState(false);

  const services = [
    "Covid-19",
    "Doctor's home visit",
    "Hospitalization",
    "Visit to the clinic",
    "Medication costs",
    "Transportation"
  ];

  const visibleServices = showAll ? services : services.slice(0, 2);

  // 0 dan boshlansin va 0,00 ko'rinishida chiqsin
  const formattedPrice = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price || 0));

  return (
    <div className='contract'>
      <h1 style={{
        fontSize: '26px',
        fontFamily: "sans-serif"
      }}>Your contract</h1>

      <div style={{
        width: '340px',
        display: "flex",
        justifyContent: 'space-between',
        marginTop: '15px',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '16px',
          fontFamily: 'sans-serif',
          width: '174px'
        }}>What is included in Your insurance policy:</h1>
        <img width={60} height={30} src="./logo2.png" alt="" />
      </div>

      <div className="servises">
        {visibleServices.map((service, index) => (
          <div key={index} className="servise">
            <img width={20} src="./check.png" alt="" />
            <p>{service}</p>
          </div>
        ))}
        <button className='toggle-btn' onClick={() => setShowAll(!showAll)}>
          {showAll ? "Hide" : "Show all"}
        </button>
      </div>

      <div className="cost-card">
        <h2 style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>
          Cost of the insurance policy:
        </h2>
        <h1 style={{ fontFamily: 'sans-serif', color: '#055087', fontSize: '25px' }}>
          {formattedPrice} €
        </h1>
      </div>
    </div>
  );
};

export default Contract;
