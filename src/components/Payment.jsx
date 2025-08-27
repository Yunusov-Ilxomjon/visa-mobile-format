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

  // ✅ Card Number formatlash #### #### #### ####
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // faqat raqamlar
    value = value.substring(0, 16); // maksimal 16 raqam
    let formatted = value.replace(/(.{4})/g, "$1 ").trim(); // 4 raqamdan keyin bo‘sh joy
    setCardNumber(formatted);
  };

  // ✅ Expiry input formatlash (07 -> 07/, 0727 -> 07/27)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiry(value);
  };

  // ✅ Validatsiya qoidalari
  const isCardValid = cardNumber.replace(/\s/g, "").length === 16;
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiry);
  const isCvvValid = cvv.length === 3;
  const isFormValid = isCardValid && isExpiryValid && isCvvValid;

  const mobileAlert = (icon, title) => {
    return Swal.fire({
      icon,
      title: `<span style="font-size: 20px; font-weight: 600;">${title}</span>`,
      showConfirmButton: false,
      timer: 2000,
      background: '#fff',
      width: '90%',
      padding: '1.5rem',
      customClass: {
        popup: 'swal-mobile-popup'
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      await mobileAlert('error', 'Please fill out all fields correctly');
      return;
    }

    if (cardNumber.replace(/\s/g, "").startsWith("4455")) {
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

          {/* ✅ Card number avtomatik format */}
          <label className="pay-label">Card number</label>
          <input
            type="text"
            className="pay-input"
            placeholder="4455 xxxx xxxx xxxx"
            maxLength={19}
            value={cardNumber}
            onChange={handleCardNumberChange}
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
                maxLength={5}
                onChange={handleExpiryChange}
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

          {/* ✅ Endi tugma doim aktiv */}
          <button className='pay-btn' type="submit">
            Pay now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
