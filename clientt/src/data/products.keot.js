// src/data/products.keot.js
// Produkte KEOT (aksesorë & mbrojtje)
import s from "../assets/230111-Instax-Mini-12-Lilac-Purple-Hero-No-Photo_0239_Stack-removebg-preview.png"


const GARANCIA_12M = "12 muaj";

const KEOT_PRODUCTS = [
  {
    id: "keot-glass-3d-iphone-17",
    slug: "keot-glass-3d-iphone-17",
    name: "KEOT 3D Tempered Glass – iPhone 17/16/15",
    price: 12,
    images: [s],
    category: "keot",
    description: "Xham 3D me skaje të zeza, rezistent ndaj goditjeve",
    isNew: true,
    tags: ["keot", "mbrojtje", "glass"],
    badge: "new",
    specs: {
      "Fortësia": "9H",
      "Veshja": "Oleofobike",
      "Kompatibiliteti": "iPhone 15/16/17",
      "Garancia": GARANCIA_12M
    }
  },
  {
    id: "keot-silicone-case-iphone-17",
    slug: "keot-silicone-case-iphone-17",
    name: "KEOT Silicone Case – iPhone 17",
    price: 15,
    images: [s],
    category: "keot",
    description: "Kuti silikoni premium me brendi mikrofiber",
    isNew: false,
    tags: ["keot", "mbrojtje", "case"],
    specs: {
      "Materiali": "Silikon + Mikrofiber",
      "Mbrojtje": "Këndet & Kamera",
      "Ngjyrat": "Black / Blue / Purple",
      "Garancia": GARANCIA_12M
    }
  },
  {
    id: "keot-20w-usb-c-charger",
    slug: "keot-20w-usb-c-charger",
    name: "KEOT 20W USB-C Adapter",
    price: 19,
    images:[s],
    category: "keot",
    description: "Karikues i shpejtë USB-C 20W, kompatibil me iPhone",
    isNew: true,
    tags: ["keot", "charging", "adapter"],
    specs: {
      "Dalja": "20W",
      "Portat": "1x USB-C",
      "Kabllo": "Opsionale",
      "Garancia": GARANCIA_12M
    }
  },
  {
    id: "keot-magsafe-powerbank-5000",
    slug: "keot-magsafe-powerbank-5000",
    name: "KEOT MagSafe Power Bank 5000 mAh",
    price: 39,
    images: [s],
    category: "keot",
    description: "Power bank magnetik për iPhone me MagSafe",
    isNew: false,
    tags: ["keot", "powerbank", "magsafe"],
    specs: {
      "Kapaciteti": "5000 mAh",
      "Lidhja": "MagSafe / USB-C",
      "Karikimi": "Wireless + Wired",
      "Garancia": GARANCIA_12M
    }
  },
  {
    id: "keot-car-charger-dual",
    slug: "keot-car-charger-dual",
    name: "KEOT Car Charger Dual USB-C/USB-A",
    price: 17,
    images: [s],
    category: "keot",
    description: "Karikues makinës me dy dalje për karikim të shpejtë",
    isNew: false,
    tags: ["keot", "car", "charging"],
    specs: {
      "Dalja": "USB-C PD + USB-A QC",
      "Futja": "12–24V",
      "Garancia": GARANCIA_12M
    }
  }
];

export default KEOT_PRODUCTS;
