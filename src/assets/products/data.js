import product1 from "./BeadMill.png";
import product2 from "./ButterflyMixer.png";
import product3 from "./HighSpeedDissolver.png";
import product4 from "./PugMixer.png";
import product5 from "./RibbonBlender.png";
import product6 from "./TwinShaftMixer.png";

// --- Newly migrated products (from legacy PHP pages) ---
// NOTE: copy the image files from the delivered "products-images" folder
// into src/assets/products/ before this will build. Filenames match the
// legacy site exactly — nothing was renamed or invented.
import productAttritorMill from "./Attritor-Mill.webp";
import productBallMill from "./Industrial-Ball-Mill-Machine.webp";
import productCowlDiscBlade from "./Cowl-Disc-Blade.webp";
import productCrossOverBench from "./Cross-Over-Bench.webp";
import productElectricalControlPanel from "./Electrical-Control-Panel.webp";
import productHydraulicLiftingDisperser from "./Hydraulic-Lifting-Disperser.png";
import productHighSpeedDisperserMotorised from "./High-Speed-Disperser-Motori.jpg";
import productSSReceiverVessels from "./SS-Receiver-Vessels.webp";
import productMSReceiverVessels from "./MS-Receiver-Vessels.webp";
import productSSTankMixingVessels from "./SS-Tank-Mixing-Vessels.webp";
import productIndustrialWallPuttyPlant from "./Industrial-Wall-Putty-Plant.webp";
import productLabStirrerMixer from "./Lab-Stirrer-Mixer.webp";
import productLDOStorageTank from "./LDO-Storage-Tank.jpg";
import productSSFilterDiscPlate from "./SS-Filter-Disc-Plate.webp";
import productStainlessSteelHeatExchanger from "./Stainless-Steel-Heat-Exchanger.webp";
import productSteelLimpetReactor from "./Steel-Limpet-Reactor.webp";
import productMSStorageTank from "./MS-Storage-Tank.webp";
import productSSTank from "./SS-Tank.webp";
import productLiquidStorageTank from "./Liquid-Storage-Tank.webp";

export const ALL = "All Products";

// Shared WhatsApp number (already used in ContactInfo.jsx)
const WHATSAPP_NUMBER = "919860480063";
const buildWhatsAppLink = (productName) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `It's feedback from Nirlaxon Industries Website (www.nirlaxsonindustries.com). I'm interested in your ${productName}`
  )}`;

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
  },

  // ============================================================
  // NEW PRODUCTS — migrated from legacy PHP pages
  // ============================================================

  {
    id: 7,
    slug: "attritor-mill-machine",
    img: productAttritorMill,
    gallery: [productAttritorMill],
    name: "Attritor Mill Machine",
    tag: "Grinding Equipment",
    desc: "Compact attritor mill for high-efficiency fine grinding of industrial materials.",
    description:
      "The Attritor Mill Machine is built for efficient fine grinding, offering reliable performance for continuous industrial production of finely milled materials.",
    specs: [
      { label: "Product Type", value: "Attritor Mill" },
      { label: "Power Source", value: "Electricity" },
      { label: "Power", value: "5 HP" },
      { label: "Weight", value: "1 Tonne" },
      { label: "Color", value: "Blue" },
      { label: "Production Capacity", value: "50 – 500 Ltr/day" },
      { label: "Supply Ability", value: "1 Set Per Day" }
    ],
    features: [
      "Robust 1-tonne build for continuous industrial duty",
      "Electric-powered drive for consistent grinding performance",
      "High production capacity of up to 500 litres/day"
    ],
    applications: ["Industrial grinding"],
    breadcrumb: "Attritor Mill Machine",
    whatsapp: buildWhatsAppLink("Attritor Mill Machine"),
    seo: {
      title: "Attritor Mill Machine | Nirlaxson Industries",
      description:
        "Industrial Attritor Mill Machine manufactured by Nirlaxson Industries — electric powered, 50–500 Ltr/day capacity, built for continuous fine grinding."
    }
  },

  {
    id: 8,
    slug: "ball-mill-machine",
    img: productBallMill,
    gallery: [productBallMill],
    name: "Industrial Ball Mill Machine",
    tag: "Grinding Equipment",
    desc: "Cylindrical grinder for reducing chemicals, ores and paint raw materials to fine powder.",
    description:
      "Industrial Ball Mill Machine is a type of grinder used to grind materials into extremely fine powder like chemicals, ores, ceramic raw materials and paints. It is a cylindrical device used in grinding (or mixing) materials. Every unit goes through varied quality checks before final dispatch.",
    specs: [
      { label: "General Use", value: "For grinding materials" },
      { label: "Product Type", value: "Ball Mill Machine" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Capacity", value: "300 Liter/day" },
      { label: "Weight", value: "200 kg" },
      { label: "Spindle Speed", value: "45 RPM" },
      { label: "Power", value: "15 – 100 HP" }
    ],
    features: [
      "Cylindrical stainless-steel grinding chamber",
      "Reduces raw material to extremely fine powder",
      "Passes multiple quality checks before dispatch"
    ],
    applications: ["Chemicals", "Ores", "Ceramic raw materials", "Paints"],
    breadcrumb: "Industrial Ball Mill Machine",
    whatsapp: buildWhatsAppLink("Industrial Ball Mill Machine"),
    seo: {
      title: "Industrial Ball Mill Machine | Nirlaxson Industries",
      description:
        "Industrial Ball Mill Machine for fine powder grinding of chemicals, ores, ceramics and paint raw materials. Stainless steel construction, 300 L/day capacity."
    }
  },

  {
    id: 9,
    slug: "cowl-disc-blade",
    img: productCowlDiscBlade,
    gallery: [productCowlDiscBlade],
    name: "Cowl Disc Blade",
    tag: "Mixing Components",
    desc: "High-shear Cowl/Saw blade impeller for wetting, dispersing and emulsifying.",
    description:
      "We are an eminent manufacturer of Cowl Disc Blade in the market. The Cowl / Saw blade design of this impeller provides mixing by generating high shear levels, and is suggested for use in wetting out powders, dispersing fine solids, breaking up agglomerations (clumps) and creating emulsions. This impeller can be fabricated to fit almost any shaft diameter and comes standard in 316 Stainless Steel.",
    specs: [
      { label: "Product Type", value: "Disc Blade" },
      { label: "Surface Color", value: "Silver" },
      { label: "Shape", value: "Round" },
      { label: "Usage", value: "Industrial" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Supply Ability", value: "1 Number Per Day" }
    ],
    features: [
      "Generates high shear for effective mixing",
      "Fabricated to fit almost any shaft diameter",
      "Standard 316 Stainless Steel construction"
    ],
    applications: [
      "Wetting out powders",
      "Dispersing fine solids",
      "Breaking up agglomerations",
      "Creating emulsions"
    ],
    breadcrumb: "Cowl Disc Blade",
    whatsapp: buildWhatsAppLink("Cowl Disc Blade"),
    seo: {
      title: "Cowl Disc Blade | Nirlaxson Industries",
      description:
        "Cowl / Saw Disc Blade impeller in 316 Stainless Steel for high-shear mixing, dispersion and emulsification. Custom-fit to shaft diameter."
    }
  },

  {
    id: 10,
    slug: "cross-over-bench",
    img: productCrossOverBench,
    gallery: [productCrossOverBench],
    name: "Cross Over Bench",
    tag: "Hospital Equipment",
    desc: "Stainless steel cross over bench built to custom hospital sizing requirements.",
    description:
      "Cross Over Bench is a Stainless Steel bench, customizable in size, designed for hospital use. It is fabricated to a high surface finish for hygienic, durable performance.",
    specs: [
      { label: "Product Type", value: "Cross Over Bench" },
      { label: "Usage", value: "Hospital" },
      { label: "Size", value: "Customized" },
      { label: "Surface Color", value: "Silver" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Supply Ability", value: "1 Number Per Day" }
    ],
    features: [
      "Fully customizable sizing",
      "Hygienic stainless-steel surface finish"
    ],
    applications: ["Hospital"],
    breadcrumb: "Cross Over Bench",
    whatsapp: buildWhatsAppLink("Cross Over Bench"),
    seo: {
      title: "Cross Over Bench | Nirlaxson Industries",
      description:
        "Stainless Steel Cross Over Bench, custom sized for hospital use. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 11,
    slug: "electrical-control-panel",
    img: productElectricalControlPanel,
    gallery: [productElectricalControlPanel],
    name: "Electrical Control Panel",
    tag: "Electrical Equipment",
    desc: "Mild steel, powder-coated control panel built to industrial standards.",
    description:
      "Backed by a team of experts, we have been a noted manufacturer of Electrical Control Panel in the market. This is accurately fabricated using authentic components and advanced machinery at our unit in accordance with industry-laid norms and standards.",
    specs: [
      { label: "Product Type", value: "Control Box" },
      { label: "Material", value: "Mild Steel" },
      { label: "Surface Finish", value: "Powder Coated" },
      { label: "Surface Color", value: "White" },
      { label: "Supply Ability", value: "20 Piece Per Day" }
    ],
    features: [
      "Fabricated with authentic, industry-grade components",
      "Powder-coated finish for durability"
    ],
    applications: ["Industrial machine control"],
    breadcrumb: "Electrical Control Panel",
    whatsapp: buildWhatsAppLink("Electrical Control Panel"),
    seo: {
      title: "Electrical Control Panel | Nirlaxson Industries",
      description:
        "Powder-coated Mild Steel Electrical Control Panel manufactured to industrial norms by Nirlaxson Industries."
    }
  },

  {
    id: 12,
    slug: "hydraulic-lifting-disperser",
    img: productHydraulicLiftingDisperser,
    gallery: [productHydraulicLiftingDisperser],
    name: "High Speed Dissolver (Hydraulic Lifting)",
    tag: "High Speed Dispersers",
    desc: "PLC-controlled hydraulic-lift disperser for high-speed dissolving applications.",
    description:
      "We are a profound manufacturer of High Speed Dissolver / Disperser in the market. It is a type of industrial mixer which utilizes a disc-shaped blade mounted on the end of the mixing shaft. To achieve high speed dispersion, the disperser blade is rotated at an optimal speed to achieve the proper flow pattern and desired consistency in your mixing vessel.",
    specs: [
      { label: "Product Type", value: "High Speed Dissolver" },
      { label: "Material", value: "Mild Steel" },
      { label: "Computerized", value: "No" },
      { label: "Automatic Grade", value: "Automatic" },
      { label: "Control System", value: "PLC Control" },
      { label: "Drive Type", value: "Hydraulic" },
      { label: "Surface Color", value: "Blue" },
      { label: "Supply Ability", value: "1 Set Per Month" }
    ],
    features: [
      "PLC-controlled automatic operation",
      "Hydraulic lifting drive",
      "Disc-shaped blade tuned for optimal dispersion flow"
    ],
    applications: ["High speed dissolving / dispersion"],
    breadcrumb: "High Speed Dissolver",
    whatsapp: buildWhatsAppLink("High Speed Dissolver"),
    seo: {
      title: "High Speed Dissolver (Hydraulic Lifting) | Nirlaxson Industries",
      description:
        "PLC-controlled, hydraulic-lift High Speed Dissolver / Disperser by Nirlaxson Industries for industrial mixing applications."
    }
  },

  {
    id: 13,
    slug: "industrial-disperser",
    img: productHighSpeedDisperserMotorised,
    gallery: [productHighSpeedDisperserMotorised],
    name: "High Speed Disperser (Motorised Lifting)",
    tag: "High Speed Dispersers",
    desc: "Motorised-lift industrial disperser offering cost-effective, precise dispersion.",
    description:
      "We at Nirlaxson Industries offer a wide range of Industrial Dispersers which are typically less expensive than other fluid dispersion methods. Because of their ease of use and generally lesser maintenance requirements, they are also less labor-intensive than other systems, with minimal cleaning needs. This variant uses motorised lifting for semi-automatic operation.",
    specs: [
      { label: "Power Source", value: "Electricity" },
      { label: "Color", value: "Green" },
      { label: "Product Type", value: "High Speed Disperser" },
      { label: "Power", value: "415 V" },
      { label: "Operating Type", value: "Semi Automatic" },
      { label: "Usage/Applications", value: "Industrial" },
      { label: "Weight", value: "1000 kg" },
      { label: "Surface Treatment", value: "Painted" },
      { label: "Delivery Time", value: "1 Week" },
      { label: "Supply Ability", value: "1 Per Day" }
    ],
    features: [
      "Motorised lifting mechanism",
      "Semi-automatic operation",
      "Low maintenance, cost-effective dispersion"
    ],
    applications: ["Industrial fluid dispersion"],
    breadcrumb: "High Speed Disperser",
    whatsapp: buildWhatsAppLink("High Speed Disperser"),
    seo: {
      title: "High Speed Disperser (Motorised Lifting) | Nirlaxson Industries",
      description:
        "Motorised-lift High Speed Disperser, semi-automatic, 415V, manufactured by Nirlaxson Industries for industrial fluid dispersion."
    }
  },

  {
    id: 14,
    slug: "ss-receiver-vessels",
    img: productSSReceiverVessels,
    gallery: [productSSReceiverVessels],
    name: "SS Receiver Vessels",
    tag: "Industrial Vessels",
    desc: "Stainless steel enclosed vessels for storing liquids, vapors and gases under pressure.",
    description:
      "We are highly engaged in providing a wide range of Industrial Vessels — enclosed containers used to hold liquids, vapors and gases at pressures much greater or lower than atmospheric pressure. They're employed across petrochemical, oil and gas, chemical, and food processing industries.",
    specs: [
      { label: "Supply Ability", value: "1 Per Day" },
      { label: "Delivery Time", value: "4 – 6 Weeks" },
      { label: "Condition", value: "New" },
      { label: "Color", value: "Silver" },
      { label: "Type", value: "Receiver Vessels" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Usage", value: "Industrial" }
    ],
    features: ["Pressure-rated enclosed construction", "Corrosion-resistant stainless steel"],
    applications: ["Petrochemical", "Oil & gas", "Chemical processing", "Food processing"],
    breadcrumb: "Industrial Vessels",
    whatsapp: buildWhatsAppLink("SS Receiver Vessels"),
    seo: {
      title: "SS Receiver Vessels | Nirlaxson Industries",
      description:
        "Stainless Steel Receiver Vessels for pressurized liquid, vapor and gas storage. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 15,
    slug: "ms-receiver-vessels",
    img: productMSReceiverVessels,
    gallery: [productMSReceiverVessels],
    name: "MS Receiver Vessels",
    tag: "Industrial Vessels",
    desc: "Mild steel receiver vessels for industrial liquid storage applications.",
    description:
      "Part of our Industrial Vessels range — enclosed Mild Steel containers used to keep liquids at controlled pressure, suited to petrochemical, oil and gas, chemical, and food processing use.",
    specs: [
      { label: "Application", value: "Liquid Storage" },
      { label: "Capacity", value: "1 – 10 KL/day" },
      { label: "Condition", value: "New" },
      { label: "Material", value: "Mild Steel" },
      { label: "Usage", value: "Industrial" },
      { label: "Color", value: "Red" },
      { label: "Type", value: "Receiver Vessels" },
      { label: "Supply Ability", value: "1 Per Day" },
      { label: "Delivery Time", value: "4 – 6 Weeks" }
    ],
    features: ["Mild steel construction for cost efficiency", "1–10 KL/day liquid storage capacity"],
    applications: ["Liquid storage", "Industrial processing"],
    breadcrumb: "Industrial Vessels",
    whatsapp: buildWhatsAppLink("MS Receiver Vessels"),
    seo: {
      title: "MS Receiver Vessels | Nirlaxson Industries",
      description:
        "Mild Steel Receiver Vessels, 1–10 KL/day capacity, for industrial liquid storage. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 16,
    slug: "ss-tank-mixing-vessels",
    img: productSSTankMixingVessels,
    gallery: [productSSTankMixingVessels],
    name: "SS Tank Mixing Vessels",
    tag: "Industrial Vessels",
    desc: "Stainless steel mixing vessels for industrial-scale liquid processing.",
    description:
      "Part of our Industrial Vessels range — Stainless Steel Tank Mixing Vessels designed for industrial mixing applications, available in a range of capacities.",
    specs: [
      { label: "Capacity", value: "500 – 2000 Liter/day" },
      { label: "Condition", value: "New" },
      { label: "Usage", value: "Industrial" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Type", value: "Mixing Vessels" },
      { label: "Color", value: "Silver" },
      { label: "Delivery Time", value: "4 – 6 Weeks" },
      { label: "Supply Ability", value: "1 Per Day" }
    ],
    features: ["Stainless steel mixing chamber", "500–2000 L/day throughput"],
    applications: ["Industrial mixing"],
    breadcrumb: "Industrial Vessels",
    whatsapp: buildWhatsAppLink("SS Tank Mixing Vessels"),
    seo: {
      title: "SS Tank Mixing Vessels | Nirlaxson Industries",
      description:
        "Stainless Steel Tank Mixing Vessels, 500–2000 L/day capacity, for industrial mixing. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 17,
    slug: "industrial-wall-putty-plant",
    img: productIndustrialWallPuttyPlant,
    gallery: [productIndustrialWallPuttyPlant],
    name: "Industrial Wall Putty Plant",
    tag: "Processing Plants",
    desc: "Automatic-grade plant for manufacturing premixed mortars, putties and adhesives.",
    description:
      "Industrial Wall Putty Plant is used for manufacturing a wide range of premixed mortars for repairing, water proofing, tile fixing, plasters, screeds and grouts. It can also be used for manufacturing tile adhesives, block laying mortars, plasters and repair mortars.",
    specs: [
      { label: "Product Type", value: "Wall Putty Plant" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Capacity", value: "2 – 3 T/hr" },
      { label: "Automatic Grade", value: "Automatic" },
      { label: "Power", value: "19500 W" },
      { label: "Color", value: "White" },
      { label: "Supply Ability", value: "10 Piece Per Day" }
    ],
    features: ["Automatic grade operation", "2–3 tonnes/hour production capacity"],
    applications: [
      "Wall putty",
      "Waterproofing mortars",
      "Tile adhesives",
      "Block-laying mortars",
      "Repair mortars"
    ],
    breadcrumb: "Industrial Wall Putty Plant",
    whatsapp: buildWhatsAppLink("Industrial Wall Putty Plant"),
    seo: {
      title: "Industrial Wall Putty Plant | Nirlaxson Industries",
      description:
        "Automatic Industrial Wall Putty Plant, 2–3 T/hr capacity, for manufacturing premixed mortars and adhesives. By Nirlaxson Industries."
    }
  },

  {
    id: 18,
    slug: "lab-stirrer-mixer",
    img: productLabStirrerMixer,
    gallery: [productLabStirrerMixer],
    name: "Lab Stirrer Mixer",
    tag: "Lab Equipment",
    desc: "Laboratory stirring apparatus for emulsifying, mixing and homogenizing samples.",
    description:
      "Lab Stirrer Mixer is designed to speed up the reaction of mixtures. It is used to emulsify, mix, disintegrate, homogenize and dissolve samples. Every unit goes through several quality inspections to ensure a highly functional and durable range for our customers.",
    specs: [
      { label: "Usage", value: "Industrial" },
      { label: "Product Type", value: "Lab Stirrer Mixer" },
      { label: "Color", value: "Blue" },
      { label: "Type", value: "Stirring Apparatus" },
      { label: "Equipment Material", value: "Stainless Steel" }
    ],
    features: ["Speeds up reaction of mixtures", "Emulsify, mix, disintegrate, homogenize and dissolve in one unit"],
    applications: ["Laboratory sample preparation"],
    breadcrumb: "Lab Stirrer Mixer",
    whatsapp: buildWhatsAppLink("Lab Stirrer Mixer"),
    seo: {
      title: "Lab Stirrer Mixer | Nirlaxson Industries",
      description:
        "Stainless Steel Lab Stirrer Mixer for emulsifying, mixing, homogenizing and dissolving lab samples. By Nirlaxson Industries."
    }
  },

  {
    id: 19,
    slug: "ldo-storage-tank",
    img: productLDOStorageTank,
    gallery: [productLDOStorageTank],
    name: "LDO Storage Tank",
    tag: "Storage Tanks",
    desc: "Semi-automatic storage tank engineered for safe LDO (fuel) storage.",
    description:
      "LDO Storage Tank is engineered for the safe, industrial-scale storage of Light Diesel Oil, with semi-automatic operating controls for ease of use.",
    specs: [
      { label: "Power", value: "440 V" },
      { label: "Product Type", value: "LDO Storage Tank" },
      { label: "Operating Type", value: "Semi Automatic" },
      { label: "Usage/Applications", value: "Industrial" },
      { label: "Power Source", value: "Electricity" },
      { label: "Color", value: "Grey" },
      { label: "Delivery Time", value: "1 Week" },
      { label: "Supply Ability", value: "1 Per Day" }
    ],
    features: ["Semi-automatic operation", "Engineered for industrial fuel storage"],
    applications: ["Light Diesel Oil (LDO) storage"],
    breadcrumb: "LDO Storage Tank",
    whatsapp: buildWhatsAppLink("LDO Storage Tank"),
    seo: {
      title: "LDO Storage Tank | Nirlaxson Industries",
      description:
        "Semi-automatic LDO (Light Diesel Oil) Storage Tank for industrial fuel storage. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 20,
    slug: "ss-filter-disc-plate",
    img: productSSFilterDiscPlate,
    gallery: [productSSFilterDiscPlate],
    name: "SS Filter Disc Plate",
    tag: "Filtration Equipment",
    desc: "Stainless steel filter disc plate available in multiple grades for industrial oil filtration.",
    description:
      "Backed by a team of experts, we have been a renowned manufacturer of SS Filter Disc Plate in the market. It is widely used across a number of industries and is available in different grades and sizes such as SS 310, SS 316 and SS 304 circles.",
    specs: [
      { label: "Product Type", value: "SS Filter Disc Plate" },
      { label: "Surface Color", value: "Silver" },
      { label: "Usage", value: "Industrial Oil Filter" },
      { label: "Type", value: "Filter Felt" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Supply Ability", value: "1 Number Per Day" }
    ],
    features: ["Available in SS 304 / 310 / 316 grades", "Multiple size options"],
    applications: ["Industrial oil filtration"],
    breadcrumb: "SS Filter Disc Plate",
    whatsapp: buildWhatsAppLink("SS Filter Disc Plate"),
    seo: {
      title: "SS Filter Disc Plate | Nirlaxson Industries",
      description:
        "Stainless Steel Filter Disc Plate (SS 304/310/316) for industrial oil filtration. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 21,
    slug: "stainless-steel-heat-exchanger",
    img: productStainlessSteelHeatExchanger,
    gallery: [productStainlessSteelHeatExchanger],
    name: "Stainless Steel Heat Exchanger",
    tag: "Heat Exchangers",
    desc: "Heat exchanger for efficient industrial cooling and heating fluid transfer.",
    description:
      "We are one of the leading manufacturers of Stainless Steel Heat Exchanger in the market. It is a system used for transferring heat between two or more fluids, and is used in both cooling and heating processes. The fluids may be separated by a solid wall to prevent mixing, or may be in direct contact.",
    specs: [
      { label: "Product Type", value: "Heat Exchanger" },
      { label: "Surface Color", value: "Grey" },
      { label: "Length", value: "5 ft" },
      { label: "Usage", value: "Industrial" },
      { label: "Condition", value: "New" }
    ],
    features: ["Suitable for both cooling and heating processes", "Efficient fluid-to-fluid heat transfer"],
    applications: ["Industrial cooling", "Industrial heating"],
    breadcrumb: "Stainless Steel Heat Exchanger",
    whatsapp: buildWhatsAppLink("Stainless Steel Heat Exchanger"),
    seo: {
      title: "Stainless Steel Heat Exchanger | Nirlaxson Industries",
      description:
        "Stainless Steel Heat Exchanger for industrial cooling and heating fluid transfer. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 22,
    slug: "steel-limpet-reactor",
    img: productSteelLimpetReactor,
    gallery: [productSteelLimpetReactor],
    name: "Steel Limpet Reactor",
    tag: "Reactors & Vessels",
    desc: "Coil-jacketed reactor for precise temperature control in high-heat applications.",
    description:
      "Steel Limpet Reactor is used to control the temperature of reactants with the help of heating or cooling media circulated through coils surrounding the main vessel. It is ideally suited for medium heat transfer requirements and heating applications where the heating media temperature is above 200°C. It stands high on effectiveness, durability and quality.",
    specs: [
      { label: "Power", value: "15000 W" },
      { label: "Condition", value: "New" },
      { label: "Product Type", value: "Steel Limpet Reactor" },
      { label: "General Use", value: "Industrial" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Capacity", value: "1 – 10 KL/day" },
      { label: "Color", value: "Silver" },
      { label: "Supply Ability", value: "10 Number Per Day" }
    ],
    features: [
      "Coil-jacketed design for precise temperature control",
      "Rated for heating media above 200°C"
    ],
    applications: ["Industrial heating/cooling reactions"],
    breadcrumb: "Steel Limpet Reactor",
    whatsapp: buildWhatsAppLink("Steel Limpet Reactor"),
    seo: {
      title: "Steel Limpet Reactor | Nirlaxson Industries",
      description:
        "Coil-jacketed Steel Limpet Reactor, 1–10 KL/day capacity, for precise industrial temperature control. By Nirlaxson Industries."
    }
  },

  {
    id: 23,
    slug: "ms-storage-tank",
    img: productMSStorageTank,
    gallery: [productMSStorageTank],
    name: "MS Storage Tank",
    tag: "Storage Tanks",
    desc: "Mild steel storage tank for industrial liquid storage, built for easy install and use.",
    description:
      "Go through our wide range of Storage Tanks, used to store water emerging from reverse osmosis or other filter systems, or other industrial liquids. These tanks are very easy to install as well as simple to use.",
    specs: [
      { label: "Usage", value: "Industrial Storage Purpose" },
      { label: "Color", value: "Red" },
      { label: "Condition", value: "New" },
      { label: "Product Type", value: "Storage Tank" },
      { label: "Delivery Time", value: "1 Day" },
      { label: "Supply Ability", value: "10 Per Day" }
    ],
    features: ["Easy to install and operate", "Economical mild-steel build"],
    applications: ["Industrial storage"],
    breadcrumb: "Storage Tank",
    whatsapp: buildWhatsAppLink("MS Storage Tank"),
    seo: {
      title: "MS Storage Tank | Nirlaxson Industries",
      description:
        "Mild Steel Storage Tank for industrial liquid storage — easy to install, economical. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 24,
    slug: "ss-tank",
    img: productSSTank,
    gallery: [productSSTank],
    name: "SS Tank",
    tag: "Storage Tanks",
    desc: "Stainless steel storage tank for industrial liquid storage applications.",
    description:
      "Part of our Storage Tank range — an SS Tank built for industrial liquid storage, easy to install and simple to use, with pressurized or atmospheric configurations available.",
    specs: [
      { label: "Supply Ability", value: "10 Per Day" },
      { label: "Delivery Time", value: "1 Day" },
      { label: "Color", value: "Silver" },
      { label: "Condition", value: "New" },
      { label: "Product Type", value: "Tank" },
      { label: "Usage", value: "Industrial" }
    ],
    features: ["Corrosion-resistant stainless steel", "Easy install and operation"],
    applications: ["Industrial storage"],
    breadcrumb: "Storage Tank",
    whatsapp: buildWhatsAppLink("SS Tank"),
    seo: {
      title: "SS Tank | Nirlaxson Industries",
      description:
        "Stainless Steel storage tank for industrial liquid storage applications. Manufactured by Nirlaxson Industries."
    }
  },

  {
    id: 25,
    slug: "liquid-storage-tank",
    img: productLiquidStorageTank,
    gallery: [productLiquidStorageTank],
    name: "Liquid Storage Tank",
    tag: "Storage Tanks",
    desc: "High-capacity liquid storage tank for petroleum, water and chemical storage.",
    description:
      "Part of our Storage Tank range — Liquid Storage Tanks for above-ground storage of petroleum, waste matter, water, chemicals and other hazardous products. Very economical and great to utilize.",
    specs: [
      { label: "Application", value: "Industrial" },
      { label: "Product Type", value: "Liquid Storage Tank" },
      { label: "Condition", value: "New" },
      { label: "Capacity", value: "1 – 100 KL/day" },
      { label: "Usage", value: "Storage Purpose" },
      { label: "Supply Ability", value: "10 Per Day" },
      { label: "Delivery Time", value: "1 Day" }
    ],
    features: ["High-capacity 1–100 KL/day storage", "Suitable for hazardous liquid storage"],
    applications: ["Petroleum storage", "Water storage", "Chemical storage"],
    breadcrumb: "Storage Tank",
    whatsapp: buildWhatsAppLink("Liquid Storage Tank"),
    seo: {
      title: "Liquid Storage Tank | Nirlaxson Industries",
      description:
        "High-capacity Liquid Storage Tank (1–100 KL/day) for petroleum, water and chemical storage. Manufactured by Nirlaxson Industries."
    }
  }
];

export const categories = [
  ALL,
  ...new Set(products.map((p) => p.tag))
];