import React from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelect from '../LanguageSelect';
import './success.css'
const Failed = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/'); // bosh sahifaga qaytish
  };

  return (
    <div className='insurance-container'>
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

      <div className="success-info">
        <h1 style={{
          fontSize: '26px',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          color: 'white'
        }}>Your payment is successful!</h1>

        <div className="success-modal">
          <img width={43} height={43} src="/dbl.png" alt="" />
          <h2 style={{
            fontSize: '16px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}>Thank you for choosing our service!</h2>
          <p style={{
            fontSize: '14px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: 'gray'
          }}>All documents will be sent to your
            e-mail within 30 minutes!
            If the letter is not received,
            you can contact our support team</p>
        </div>
        <button className='back-btn' onClick={handleBackHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Failed;
