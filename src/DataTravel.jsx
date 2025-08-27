import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./datatravel.css";

const DataTravelCard = ({ index, onRemove, canRemove, isBuyer, onBuyerChange, requireBuyer }) => {
  return (
    <div className="data-card">
      {canRemove && (
        <button
          type="button"
          className="remove-btn"
          onClick={() => onRemove(index)}
          title="Remove traveler"
        >
          ✖
        </button>
      )}

      <div className="f1">
        <h3 style={{ fontSize: "16px", fontFamily: "sans-serif" }}>
          Data for {index + 1} traveler
        </h3>
        <p
          style={{
            fontSize: "16px",
            fontFamily: "sans-serif",
            color: "#8C8B9B",
            marginTop: "10px",
            width: "250px",
          }}
        >
          Why don't you need a passport for registration?
        </p>

        <label>First name</label>
        <input className="input" type="text" required />

        <label>Last name</label>
        <input className="input" type="text" required />

        <label>Birth date</label>
        <input className="input" type="date" required />

        <div className="check">
          <input
            id={`buyer-${index}`}
            className="input"
            type="checkbox"
            checked={isBuyer}
            onChange={(e) => onBuyerChange(index, e.target.checked)}
            required={requireBuyer}
          />
          <label
            htmlFor={`buyer-${index}`}
            style={{
              fontSize: "16px",
              fontFamily: "sans-serif",
              color: "#8C8B9B",
              cursor: "pointer",
            }}
          >
            The traveler is buyer
          </label>
        </div>
      </div>
    </div>
  );
};

export default function TravelersList() {
  const [cards, setCards] = useState([{}]);
  const [buyers, setBuyers] = useState([false]);
  const [emails, setEmails] = useState([""]); // 🔹 Buyer card uchun email massiv
  const navigate = useNavigate();

  const addTraveler = () => {
    setCards((prev) => [...prev, {}]);
    setBuyers((prev) => [...prev, false]);
  };

  const removeTraveler = (index) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
    setBuyers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBuyerChange = (index, checked) => {
    setBuyers((prev) => {
      const copy = [...prev];
      copy[index] = checked;
      return copy;
    });
  };

  // 🔹 Email funksiyalari
  const addEmail = () => {
    if (emails.length < 5) {
      setEmails([...emails, ""]);
    }
  };

  const handleEmailChange = (index, value) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasBuyer = buyers.some(Boolean);
    if (!hasBuyer) {
      alert("Please mark at least one traveler as buyer.");
      return;
    }

    navigate("/payment");
  };

  return (
    <form onSubmit={handleSubmit}>
      {cards.map((_, index) => (
        <DataTravelCard
          key={index}
          index={index}
          onRemove={removeTraveler}
          canRemove={index !== 0}
          isBuyer={buyers[index]}
          onBuyerChange={handleBuyerChange}
          requireBuyer={cards.length === 1}
        />
      ))}

      <button type="button" className="card-btn" onClick={addTraveler}>
        Add a traveler
      </button>

      {/* ----Buyer card----- */}
      <div className="buyer-card">
        <div className="f2">
          <h3 style={{ fontSize: "16px", fontFamily: "sans-serif" }}>
            Data for 1 traveler
          </h3>
          <p
            style={{
              fontSize: "16px",
              fontFamily: "sans-serif",
              color: "#8C8B9B",
              marginTop: "10px",
              width: "250px",
            }}
          >
            Why don't you need a passport for registration?
          </p>

          <label>First name</label>
          <input className="input" type="text" required />

          <label>Last name</label>
          <input className="input" type="text" required />

          <label>Birth date</label>
          <input className="input" type="date" required />

          {/* 🔹 Dynamic emails */}
          {emails.map((email, index) => (
            <div
              key={index}
              style={{ marginBottom: "15px", position: "relative" }}
            >
              <label style={{ display: "block", marginBottom: "5px" }}>
                E-mail {index + 1}
              </label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="...@gmail.com"
                required
                style={{ width: "100%", paddingRight: "30px" }}
              />
              {emails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEmail(index)}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "75%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    fontSize: "16px",
                    color: "red",
                    cursor: "pointer",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  ✖
                </button>
              )}
            </div>
          ))}

          {emails.length < 5 && (
            <button type="button" className="buyer-btn" onClick={addEmail}>
              Add another E-mail +
            </button>
          )}
        </div>
      </div>

      {/* ----------Payment----------- */}
      <div className="payment">
        <button type="submit" className="payment-btn">
          Pay for an insurance policy (69,00 €)
          <br />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img width={28} src="./flags/ru.png" alt="" />
            <p>6 879,23 rub.</p>
          </div>
        </button>

        <p className="buyer-p">
          I am familiar with the User Agreement, offer agreement
          <br /> and I consent to the processing of personal data
        </p>
      </div>
    </form>
  );
}
