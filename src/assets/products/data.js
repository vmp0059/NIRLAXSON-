import product1 from "./BeadMill.png";
import product2 from "./ButterflyMixer.png";
import product3 from "./HighSpeedDissolver.png";
import product4 from "./PugMixer.png";
import product5 from "./RibbonBlender.png";
import product6 from "./TwinShaftMixer.png";

export const ALL = "All Products";

export const products = [
  {
    id: 1,
    img: product3,
    name: "High Speed Dissolver",
    tag: "Mixing & Blending",
    desc: "Engineered for high-viscosity applications in paint and coating industries.",
    specs: [
      { label: "Speed", value: "0 – 1500 RPM" },
      { label: "Power", value: "1 – 75 kW" },
      { label: "Capacity", value: "Up to 5000 L" },
      { label: "Material", value: "SS / MS" }
    ]
  },

  {
    id: 2,
    img: product5,
    name: "Ribbon Blender",
    tag: "Blending Equipment",
    desc: "Ideal for uniform dry powder and granule mixing.",
    specs: [
      { label: "Capacity", value: "50 – 5000 L" },
      { label: "Power", value: "2 – 55 kW" },
      { label: "Material", value: "SS / MS" },
      { label: "Drive", value: "Gearbox" }
    ]
  },

  {
    id: 3,
    img: product2,
    name: "Butterfly Mixer",
    tag: "Heavy Duty Mixing",
    desc: "Built for heavy-duty mixing applications.",
    specs: [
      { label: "Capacity", value: "Up to 1000 L" },
      { label: "Power", value: "5 – 30 kW" },
      { label: "Drive", value: "Hydraulic" },
      { label: "Material", value: "SS / MS" }
    ]
  },

  {
    id: 4,
    img: product1,
    name: "Bead Mill",
    tag: "Grinding Equipment",
    desc: "Precision grinding for ultra-fine particle size reduction.",
    specs: [
      { label: "Fineness", value: "< 1 µm" },
      { label: "Power", value: "2 – 90 kW" },
      { label: "Flow", value: "Continuous" },
      { label: "Chamber", value: "SS" }
    ]
  },

  {
    id: 5,
    img: product4,
    name: "Pug Mixer",
    tag: "Industrial Mixing",
    desc: "Designed for mixing plastic, clay and pigment pastes.",
    specs: [
      { label: "Capacity", value: "25 – 2000 L" },
      { label: "Power", value: "3 – 45 kW" },
      { label: "Action", value: "Twin Arm" },
      { label: "Material", value: "SS / MS" }
    ]
  },

  {
    id: 6,
    img: product6,
    name: "Twin Shaft Mixer",
    tag: "Dual Shaft Mixing",
    desc: "High-intensity dual-shaft design.",
    specs: [
      { label: "Speed", value: "0 – 60 RPM" },
      { label: "Power", value: "5 – 55 kW" },
      { label: "Shafts", value: "2" },
      { label: "Material", value: "SS / MS" }
    ]
  }
];

export const categories = [
  ALL,
  ...new Set(products.map((p) => p.tag))
];