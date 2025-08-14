import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LanguageSelect from "../LanguageSelect";
import './payment.css';

const Payment = () => {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const isFormValid = cardNumber && expiry && cvv;

  const mobileAlert = (icon, title) => {
    return Swal.fire({
      icon,
      title: `<span style="font-size: 20px; font-weight: 600;">${title}</span>`,
      showConfirmButton: false,
      timer: 2000,
      background: '#fff',
      width: '90%', // mobilga mos
      padding: '1.5rem',
      customClass: {
        popup: 'swal-mobile-popup'
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cardNumber.startsWith("4455") && cardNumber.length === 16) {
      await mobileAlert('success', 'Your payment SUCCESSFUL');
      navigate('/success');
    } else {
      await mobileAlert('error', 'Your payment FAILED');
      navigate('/failed');
    }
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

      <div className="payment-form">
        <h1 style={{
          fontSize: "26px",
          fontFamily: "sans-serif",
          color: "white",
          textAlign: "center",
        }}>
          Payment
        </h1>

        <form className="pay-form" onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img width={70} height={33} src="/logo2.png" alt="" />
            <div>
              <p style={{
                fontSize: "16px",
                fontFamily: "sans-serif",
                color: "black",
              }}>
                ART12006 30.07.2025
              </p>
              <h1 style={{
                fontSize: "17px",
                fontFamily: "sans-serif",
                color: "#055087",
                fontWeight: "600",
                textAlign: "end",
              }}>
                6 879,23 ₽
              </h1>
            </div>
          </div>

          <label className="pay-label">Card number</label>
          <input
            type="text"
            className="pay-input"
            placeholder="4455..."
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            required
          />

          <div className="pay-row">
            <div className="pay-col">
              <label className="pay-label">Validity period</label>
              <input
                type="text"
                className="pay-small-input"
                placeholder="MM/YY"
                value={expiry}
                maxLength={4}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>
            <div className="pay-col">
              <label className="pay-label">CVV</label>
              <input
                type="password"
                className="pay-small-input"
                placeholder="***"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>
          </div>

          <p className="pay-terms">
            By clicking pay now you accept{" "}
            <a href="#" className="pay-link">
              the offer
              <br />agreement
            </a>
          </p>

          <button
            className='pay-btn'
            type="submit"
            disabled={!isFormValid}
          >
            Pay now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
