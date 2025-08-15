import React from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelect from '../LanguageSelect';
import './failed.css'
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

      <div className="failed-info">
        <h1 style={{
          fontSize: '26px',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          color: 'white'
        }}>Your payment
          <br />failed!</h1>

        <div className="failed-modal">
          <img width={43} height={43} src="/error.png" alt="" />
          <h2 style={{
            fontSize: '16px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}>Unfortunately, an error is occurred!</h2>
          <p style={{
            fontSize: '14px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: 'gray'
          }}>Possible reasons:</p>
          <ul class="custom-list">
            <li>There are not enough funds on the card</li>
            <li>The card limit is exceeded</li>
            <li>Card details entered incorrectly</li>
            <li>The card is expired</li>
            <li>The card cannot be used for online payments</li>
            <li>
              The 3D Secure service is not activated
              (an SMS with an one-time code is sent to your phone to confirm the operation)
            </li>
          </ul>
                    <p style={{
            fontSize: '14px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: 'gray'
          }}>Please contact your support service and we will provide alternative payment variants.</p>

        </div>
        <button className='back-btn' onClick={handleBackHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Failed;
