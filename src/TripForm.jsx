import React, { useEffect, useRef, useState } from "react";
import "./TripForm.css";

export default function TripForm({ onCalculate }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);

  const [annual, setAnnual] = useState(false);
  const [annualDays, setAnnualDays] = useState("");

  const [travelers, setTravelers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  // Kunlarni hisoblash
  const computeDays = (s, e) => {
    if (!s || !e) return 0;
    const start = new Date(s);
    const end = new Date(e);
    if (isNaN(start) || isNaN(end)) return 0;
    const diffMs = end - start;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
      if (!annual) setDays(computeDays(value, endDate));
    } else {
      setEndDate(value);
      if (!annual) setDays(computeDays(startDate, value));
    }
  };

  const handleAnnualChange = (e) => {
    const checked = e.target.checked;
    setAnnual(checked);
    if (checked) {
      setDays(annualDays ? Number(annualDays) : 0);
    } else {
      setDays(computeDays(startDate, endDate));
    }
  };

  const handleAnnualDaysSelect = (value) => {
    setAnnualDays(value);
    setDays(Number(value));
  };

  const handleSelectAge = (age) => {
    const numAge = Number(age);
    if (Number.isNaN(numAge)) return;
    setTravelers((prev) => [...prev, numAge]);
    setIsOpen(false);
  };

  const removeTraveler = (index) => {
    setTravelers((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const mainInputLabel =
    travelers.length > 0 ? `${travelers.join(", ")} years` : "Select age";

  // >>> Faqat tugma bosilganda hisoblaymiz
  const handleCalculateClick = () => {
    const travelersCount = travelers.length;
    if (typeof onCalculate === "function") {
      onCalculate(days, travelersCount); // Parent: days * travelers * 10
    }

    
  };

  return (
    <form className="date-form" ref={wrapperRef} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="start-date">The first trip date:</label>
      <input
        id="start-date"
        className="date-input"
        type="date"
        value={startDate}
        onChange={(e) => handleDateChange("start", e.target.value)}
      />

      {!annual ? (
        <>
          <label htmlFor="end-date">The last trip date:</label>
          <input
            id="end-date"
            className="date-input"
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange("end", e.target.value)}
          />
        </>
      ) : (
        <>
          <label htmlFor="annual-days">Number of days in a year:</label>
          <select
            id="annual-days"
            className="date-input"
            value={annualDays}
            onChange={(e) => handleAnnualDaysSelect(e.target.value)}
          >
            <option value="">Select days</option>
            {[10, 15, 30, 45, 60, 90, 180, 365].map((d) => (
              <option key={d} value={d}>
                {d} days
              </option>
            ))}
          </select>
        </>
      )}

      <h2 style={{ marginTop: "15px", fontSize: "15px" }}>
        Amount of days: {days}
      </h2>

      <div style={{ marginTop: "10px" }}>
        <input
          type="checkbox"
          id="annual"
          checked={annual}
          onChange={handleAnnualChange}
        />
        <label htmlFor="annual">Annual insurance policy</label>
      </div>

      <div style={{ marginTop: "18px" }}>
        <h4 style={{ marginBottom: 8 }}>Travelers ({travelers.length}):</h4>

        <div className="input-select" onClick={() => setIsOpen((v) => !v)}>
          <span className={`input-text ${travelers.length === 0 ? "placeholder" : ""}`}>
            {mainInputLabel}
          </span>
          <span className="chev">{isOpen ? "▴" : "▾"}</span>
        </div>

        {isOpen && (
          <div className="dropdown">
            {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
              <div
                key={age}
                className="dropdown-item"
                onClick={() => handleSelectAge(age)}
              >
                {age} years
              </div>
            ))}
          </div>
        )}

        <div className="travelers-list">
          {travelers.map((age, i) => (
            <div key={i} className="traveler-item">
              <span>
                {i + 1} tourist: {age} years
              </span>
              <button
                type="button"
                className="traveler-remove"
                onClick={() => removeTraveler(i)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>

<button
  type="button"
  className="form-btn"
  onClick={() => onCalculate(days, travelers.length)}
>
  Calculate
</button>

    </form>
  );
}
