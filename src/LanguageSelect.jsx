import React, { useState } from "react";

const languages = [
    { code: "uz", flag: "/flags/uz.png" },
    { code: "ru", flag: "/flags/ru.png" },
    { code: "en", flag: "/flags/en.png" },
];

export default function FlagSelect() {
    const [selected, setSelected] = useState(languages[0]);
    const [open, setOpen] = useState(false);

    return (
        <div style={{ position: "relative", width: "60px" }}>
            {/* Tanlangan bayroq */}
            <div
                onClick={() => setOpen(!open)}
                style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img src={selected.flag} alt={selected.code} style={{ width: 40 }} />
            </div>

            {/* Dropdown */}
            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "45px",
                        left: 0,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                        zIndex: 10
                    }}
                >
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => {
                                setSelected(lang);
                                setOpen(false);
                            }}
                            style={{
                                padding: "5px",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <img src={lang.flag} alt={lang.code} style={{ width: 25 }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
