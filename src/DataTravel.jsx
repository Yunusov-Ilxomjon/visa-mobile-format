import React, { useState } from "react";
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
    </div>
  );
}
