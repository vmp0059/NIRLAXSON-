import "./ClientsSlider.css";

const clients = [
  { name: "Accurex", logo: "/clients/Accurex.jpg" },
  { name: "Advance Paints", logo: "/clients/Advance Paints.webp" },
  { name: "Anchor", logo: "/clients/Anchor.webp" },
  { name: "Apurva", logo: "/clients/Apurva.webp" },
  { name: "Astra", logo: "/clients/Astra.webp" },

  { name: "Borosil", logo: "/clients/Borosil.webp" },
  { name: "Connell", logo: "/clients/Connell.webp" },
  { name: "Duraklean", logo: "/clients/Duraklean.webp" },
  { name: "Global Paints", logo: "/clients/Global Paints.jpg" },
  { name: "JKcement", logo: "/clients/JKcement.webp" },

  { name: "JSW Paints", logo: "/clients/JSWpaints.webp" },
  { name: "JSW Steel", logo: "/clients/JSWsteel.webp" },
  { name: "Kupsa", logo: "/clients/Kupsa.webp" },
  { name: "New Alliance", logo: "/clients/New Alliance.jpg" },
  { name: "Prime", logo: "/clients/Prime.webp" },

  { name: "RAND", logo: "/clients/RAND.jpg" },
  { name: "Shubham", logo: "/clients/Shubham.jpg" },
  { name: "Spinx", logo: "/clients/Spinx.webp" },
  { name: "Supranav", logo: "/clients/Supranav.jpg" },
  { name: "Teknovace", logo: "/clients/Teknovace.jpg" },

  { name: "Victory", logo: "/clients/Victory.webp" },
  { name: "Vinayak Chemex", logo: "/clients/Vinayak Chemex.webp" },
  { name: "Wellsun", logo: "/clients/Wellsun.jpg" },
];

function ClientsSlider() {
  return (
    <section className="clients-section">

      {/* Header */}
      <div className="clients-header">
        <span className="clients-eyebrow">Trusted By</span>

        <h2 className="clients-title">
          Our Clients &amp; Associates
        </h2>

        <div className="clients-divider" />
      </div>

      {/* Logo grid */}
      <div className="clients-grid-wrap">
        <div className="clients-grid">

          {clients.map((client) => (
            <div
              className="client-logo-card"
              key={client.name}
              title={client.name}
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}

export default ClientsSlider;