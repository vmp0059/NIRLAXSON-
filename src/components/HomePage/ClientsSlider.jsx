// src/components/ClientsSlider.jsx
//
// HOW TO ADD CLIENT LOGOS:
// 1. Place logo images in src/assets/clients/
// 2. Import them below
// 3. Set logo: LogoVar in the clients array
// 4. Initials placeholder shown automatically when logo is null

import "./ClientsSlider.css";


import JSWpaintsLogo  from "../../assets/clients/JSWpaints.png";
import JSWsteelLogo       from "../../assets/clients/JSWsteel.png";
// ── Add your logo imports here ──────────────
// import PidiliteLogo     from "../assets/clients/pidilite.png";
// import KansaiLogo       from "../assets/clients/kansai.png";
// import AkzoLogo         from "../assets/clients/akzo.png";
// import ShalimarLogo     from "../assets/clients/shalimar.png";
// import IndofilLogo      from "../assets/clients/indofil.png";
// import SudarshanLogo    from "../assets/clients/sudarshan.png";
// import ClariantLogo     from "../assets/clients/clariant.png";
// import BasfLogo         from "../assets/clients/basf.png";
// ────────────────────────────────────────────

const clients = [
  { name: "Asian Paints",        logo: JSWpaintsLogo },
  { name: "Berger Paints",       logo: JSWsteelLogo },
  { name: "Pidilite Industries", logo: null },
  { name: "Kansai Nerolac",      logo: null },
  { name: "Akzo Nobel",          logo: null },
  { name: "Shalimar Paints",     logo: null },
  { name: "Indofil Industries",  logo: null },
  { name: "Sudarshan Chemical",  logo: null },
  { name: "Clariant India",      logo: null },
  { name: "BASF India",          logo: null },
];

// 2-letter initials fallback — "Asian Paints" → "AP"
function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Split into rows of 5
function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function ClientsSlider() {
  const rows = chunkArray(clients, 5);

  return (
    <section className="clients-section">

      {/* Header */}
      <div className="clients-header">
        <span className="clients-eyebrow">Trusted By</span>
        <h2 className="clients-title">Our Clients &amp; Associates</h2>
        <div className="clients-divider" />
      </div>

      {/* Logo grid — no text, just logos */}
      <div className="clients-grid-wrap">
        {rows.map((row, rowIndex) => (
          <div className="clients-row" key={rowIndex}>
            {row.map((client, i) => (
              <div className="client-logo-card" key={i} title={client.name}>
                {client.logo ? (
                  /* Real logo image */
                  <img src={client.logo} alt={client.name} />
                ) : (
                  /* Initials placeholder — remove once real logos added */
                  <span className="client-logo-placeholder">
                    {getInitials(client.name)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  );
}

export default ClientsSlider;