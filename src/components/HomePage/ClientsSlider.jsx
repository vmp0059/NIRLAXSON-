import "./ClientsSlider.css";

const clients = [
  { name: "Accurex", logo: "/clients/Accurex.jpg" },
  { name: "Advance Paints", logo: "/clients/Advance Paints.jpg" },
  { name: "Anchor", logo: "/clients/Anchor.jpg" },
  { name: "Apurva", logo: "/clients/Apurva.jpg" },
  { name: "Astra", logo: "/clients/Astra.jpg" },

  { name: "Borosil", logo: "/clients/Borosil.jpg" },
  { name: "Connell", logo: "/clients/Connell.jpg" },
  { name: "Duraklean", logo: "/clients/Duraklean.jpg" },
  { name: "Global Paints", logo: "/clients/Global Paints.jpg" },
  { name: "JKcement", logo: "/clients/JKcement.jpg" },

  { name: "JSW Paints", logo: "/clients/JSWpaints.png" },
  { name: "JSW Steel", logo: "/clients/JSWsteel.png" },
  { name: "Kupsa", logo: "/clients/Kupsa.jpg" },
  { name: "New Alliance", logo: "/clients/New Alliance.jpg" },
  { name: "Prime", logo: "/clients/Prime.jpg" },

  { name: "RAND", logo: "/clients/RAND.jpg" },
  { name: "Shubham", logo: "/clients/Shubham.jpg" },
  { name: "Spinx", logo: "/clients/Spinx.jpg" },
  { name: "Supranav", logo: "/clients/Supranav.jpg" },
  { name: "Teknovace", logo: "/clients/Teknovace.jpg" },

  { name: "Victory", logo: "/clients/Victory.jpg" },
  { name: "Vinayak Chemex", logo: "/clients/Vinayak Chemex.jpg" },
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
              />
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}

export default ClientsSlider;