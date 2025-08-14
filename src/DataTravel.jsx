import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./datatravel.css";

const DataTravelCard = ({ index, onRemove, canRemove }) => {
  return (
    <div className="data-card">
      {/* X tugmasi faqat 2-carddan boshlab chiqadi */}
      {canRemove && (
        <button
          className="remove-btn"
          onClick={() => onRemove(index)}
          title="Remove traveler"
        >
          ✖
        </button>
      )}

      <form className="f1" action="">
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
        <input className="input" type="text" />

        <label>Last name</label>
        <input className="input" type="text" />

        <label>Birth date</label>
        <input className="input" type="date" />

        <div className="check">
          <input id={`buyer-${index}`} className="input" type="checkbox" />
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
      </form>
    </div>
  );
};

export default function TravelersList() {
  const [cards, setCards] = useState([{}]);
  const navigate = useNavigate(); // 🔹 Bu joyga ko‘chirdim

  const addTraveler = () => {
    setCards((prev) => [...prev, {}]);
  };

  const removeTraveler = (index) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {cards.map((_, index) => (
        <DataTravelCard
          key={index}
          index={index}
          onRemove={removeTraveler}
          canRemove={index !== 0}
        />
      ))}

      <button className="card-btn" onClick={addTraveler}>
        Add a traveler
      </button>

      {/* ----Buyer card----- */}
      <div className="buyer-card">
        <form className="f2" action="">
          <h3 style={{
            fontSize: "16px",
            fontFamily: "sans-serif"
          }}>Data for 1 traveler</h3>
          <p style={{
            fontSize: "16px",
            fontFamily: "sans-serif",
            color: "#8C8B9B",
            marginTop: "10px",
            width: "250px"
          }}>Why don't you need a passport for registration?</p>

          <label>First name</label>
          <input className="input" type="text" />

          <label>Last name</label>
          <input className="input" type="text" />

          <label>Birth date</label>
          <input className="input" type="date" />

          <label>E-mail</label>
          <input className="input" type="email" placeholder="...@gmail.com" />

          <button type="button" className="buyer-btn">
            Add another E-mail +
          </button>
        </form>
      </div>

      {/* ----------Payment----------- */}
      <div className="payment">
        <button
          type="button"
          className="payment-btn"
          onClick={() => navigate("/payment")}
        >
          Pay for an insurance policy (69,00 €)
          <br />
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <img width={28} src="./flags/ru.png" alt="" />
            <p>6 879,23 rub.</p>
          </div>
        </button>

        <p className="buyer-p">
          I am familiar with the User Agreement, offer agreement
          <br /> and I consent to the processing of personal data
        </p>
      </div>
    </div>
  );
}
