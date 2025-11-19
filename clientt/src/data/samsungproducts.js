// src/data/samsungProducts.js

// Importet nga /src/assets
import imgS25Edge from "../assets/samsung-galaxy-s25-edge-5g-jetblack-512gb-and-12gb-ram-sm-s937b__1_-removebg-preview.png";
import imgS24Ultra from "../assets/Samsung-Galaxy-S24-Ultra-Titanium-Grey-removebg-preview.webp";
import imgA07 from "../assets/samsung-A07-removebg-preview.png";
import imgGeneric from "../assets/s-l400-removebg-preview.png";
import ultra24 from "../assets/Samsung-Galaxy-S24-Ultra-Titanium-Black-removebg-preview.png";
import foto22 from "../assets/images__7_-removebg-preview.png";
import foto23 from "../assets/images__8_-removebg-preview.png";
import foto222 from "../assets/images__9_-removebg-preview.png";
import samsungfe from "../assets/SAMUNTGALAXYS23FEMINT1_1000x1000-removebg-preview.png";
import samungfes from "../assets/51Sb5GG5jGL-removebg-preview.png";
import samsungS23 from "../assets/images__10_-removebg-preview.png";
import samungSS23 from "../assets/smsung-S23-ultra-black-1-removebg-preview.png";
import samsungA35 from "../assets/download__3_-removebg-preview.png";
import galaxy22 from "../assets/THUMB_GalaxyS22Ultra_MA_Thumb_1440x960-removebg-preview.png";
import galaxys22 from "../assets/images__11_-removebg-preview.png";
import galaxym34 from "../assets/Samsung-Galaxy-M34-5G-removebg-preview.png";
import samsungfee from "../assets/images__12_-removebg-preview.png";
import samsungA25 from "../assets/\images__13_-removebg-preview.png";
import samsungzfold from "../assets/images__14_-removebg-preview.png";
import samsungA15 from "../assets/samsung_galaxy_a15_pro-removebg-preview.png"

// Nëse ndonjë produkt s’ka foto lokale, përdorim placeholder
const PLACEHOLDER =
  "https://via.placeholder.com/800x600?text=Samsung+Product";

// Lidhja e fotove me variablat ekzistuese
const foto21 = imgS24Ultra;    // S24 Ultra
const foto777 = imgGeneric;    // S22
const fe = PLACEHOLDER;        // S21 FE mbetet placeholder
const sh = imgA07;             // A25
const zf = imgGeneric;         // Z Fold 5
const a5 = imgA07;             // A15
const samsungProducts = [
  {
    id: "galaxy-s24-ultra",
    slug: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    description: "Galaxy S24 Ultra, 12GB RAM, 512GB, 200MP",
    price: 765, // 715 + 50
    oldPrice: 755,
    images: [foto21, ultra24],
    specs: {
      Ekrani: "6.8” QHD+ AMOLED, 120Hz",
      Procesori: "Snapdragon 8 Gen 3",
      Memoria: "512GB",
      RAM: "12GB",
      "Kamera Kryesore": "200MP + 50MP + 12MP + 10MP",
      "Kamera Selfie": "12MP",
      Bateria: "5000mAh",
      Ngjyra: "Phantom Black",
      Garancia: "12 muaj",
    },
    category: "samsung",
  },
  {
    id: "galaxy-a55",
    slug: "galaxy-a55",
    name: "Samsung Galaxy A55",
    description: "Galaxy A55, 6.6” ekran, 128GB, 5000mAh.",
    price: 355, // 305 + 50
    oldPrice: 350,
  images: [foto23],
    specs: {
      Ekrani: "6.6” Super AMOLED, 120Hz",
      Procesori: "Exynos 1480",
      Memoria: "128GB",
      RAM: "8GB",
      "Kamera Kryesore": "50MP + 12MP + 5MP",
      "Kamera Selfie": "32MP",
      Bateria: "5000mAh",
      Ngjyra: "Awesome Ice Blue",
      Garancia: "12 muaj",
    },
    category: "samsung",
  },
  {
    id: "galaxy-z-flip-5",
    slug: "galaxy-z-flip-5",
    name: "Samsung Galaxy Z Flip 5",
    description: "Z Flip 5, telefon i palosshëm, 8GB RAM, 256GB.",
    price: 769, // 719 + 50
    oldPrice: 769,
    images: [foto22, foto222],
    specs: {
      Ekrani: "6.7” Dynamic AMOLED 2X, 120Hz",
      Procesori: "Snapdragon 8 Gen 2",
      Memoria: "256GB",
      RAM: "8GB",
      "Kamera Kryesore": "12MP + 12MP",
      "Kamera Selfie": "10MP",
      Bateria: "3700mAh",
      Ngjyra: "Mint",
      Garancia: "12 muaj",
    },
    category: "samsung",
  },
  {
    id: "galaxy-s23-fe",
    slug: "galaxy-s23-fe",
    name: "Samsung Galaxy S23 FE",
    description: "S23 FE, 8GB RAM, 128GB, 6.4” ekran, 5G.",
    price: 700, // 650 + 50
    oldPrice: 740,
    images: [
      samsungfe, samungfes
    ],
    specs: {
      Ekrani: "6.4” Dynamic AMOLED 2X, 120Hz",
      Procesori: "Exynos 2200",
      Memoria: "128GB",
      RAM: "8GB",
      "Kamera Kryesore": "50MP + 8MP + 12MP",
      "Kamera Selfie": "10MP",
      Bateria: "4500mAh",
      Ngjyra: "Graphite",
      Garancia: "12 muaj",
    },
    category: "samsung",
  },
  {
    id: "galaxy-s23-ultra",
    slug: "galaxy-s23-ultra",
    name: "Samsung Galaxy S23 Ultra",
    description: "S23 Ultra, 12GB RAM, 256GB, kamera 200MP.",
    // Çmimi te Mobifita: 580 → ti je +50 = 630
    price: 630,
    oldPrice: 720,
    images: [
     samsungS23, samungSS23
    ],
    specs: {
      Ekrani: "6.8” Dynamic AMOLED 2X, 120Hz",
      Procesori: "Snapdragon 8 Gen 2",
      Memoria: "256GB",
      RAM: "12GB",
      "Kamera Kryesore": "200MP + 10MP + 12MP + 10MP",
      "Kamera Selfie": "12MP",
      Bateria: "5000mAh",
      Ngjyra: "Green",
      Garancia: "12 muaj",
    },
  category: "samsung",
  },
  {
    id: "galaxy-a35",
    slug: "galaxy-a35",
    name: "Samsung Galaxy A35",
    description: "A35, 6.6” Super AMOLED, 128GB, 5000mAh.",
    price: 329, // 279 + 50
    oldPrice: 320,
    images: [
     samsungA35
    ],
    specs: {
      Ekrani: "6.6” Super AMOLED, 120Hz",
      Procesori: "Exynos 1380",
      Memoria: "128GB",
      RAM: "6GB",
      "Kamera Kryesore": "50MP + 8MP + 5MP",
      "Kamera Selfie": "13MP",
      Bateria: "5000mAh",
      Ngjyra: "Awesome Navy",
      Garancia: "12 muaj",
    },
  category: "samsung",
  },
  {
    id: "galaxy-s22",
    slug: "galaxy-s22",
    name: "Samsung Galaxy S22",
    description: "S22, 8GB RAM, 128GB, ekran kompakt 6.1”.",
    price: 749, // 699 + 50
    images: [galaxy22],
    specs: {
      Ekrani: "6.1” Dynamic AMOLED 2X, 120Hz",
      Procesori: "Snapdragon 8 Gen 1",
      Memoria: "128GB",
      RAM: "8GB",
      "Kamera Kryesore": "50MP + 10MP + 12MP",
      "Kamera Selfie": "10MP",
      Bateria: "3700mAh",
      Ngjyra: "Phantom White",
      Garancia: "12 muaj",
    },
  category: "samsung",
  },
  {
    id: "galaxy-m34",
    slug: "galaxy-m34",
    name: "Samsung Galaxy M34",
    description: "M34, 6.5” Super AMOLED, 128GB.",
    price: 389.5, // 339.5 + 50
    images: [
      galaxym34
    ],
    specs: {
      Ekrani: "6.5” Super AMOLED, 120Hz",
      Procesori: "Exynos 1280",
      Memoria: "128GB",
      RAM: "6GB",
      "Kamera Kryesore": "50MP + 8MP + 2MP",
      "Kamera Selfie": "13MP",
      Bateria: "6000mAh",
      Ngjyra: "Prism Silver",
      Garancia: "12 muaj",
    },
  category: "samsung",
  },
  {
    id: "galaxy-s21-fe",
    slug: "galaxy-s21-fe",
    name: "Samsung Galaxy S21 FE",
    description: "S21 FE, 6.4” AMOLED, 128GB, 5G.",
    price: 919, // 869 + 50
    images: [samsungfee],
    specs: {
      Ekrani: "6.4” Dynamic AMOLED 2X, 120Hz",
      Procesori: "Snapdragon 888",
      Memoria: "128GB",
      RAM: "6GB",
      "Kamera Kryesore": "12MP + 8MP + 12MP",
      "Kamera Selfie": "32MP",
      Bateria: "4500mAh",
      Ngjyra: "Lavender",
      Garancia: "12 muaj",
    },
  category: "samsung",
  },
  {
    id: "galaxy-a25",
    slug: "galaxy-a25",
    name: "Samsung Galaxy A25",
    description: "A25, 6.5” Super AMOLED, 128GB, 5000mAh.",
    price: 399, // 349 + 50
    images: [samsungA25],
    specs: {
      Ekrani: "6.5” Super AMOLED, 120Hz",
      Procesori: "Exynos 1280",
      Memoria: "128GB",
      RAM: "6GB",
      "Kamera Kryesore": "50MP + 8MP + 2MP",
      "Kamera Selfie": "13MP",
      Bateria: "5000mAh",
      Ngjyra: "Blue",
      Garancia: "12 muaj",
    },
  category: "samsung",
  },
  {
    id: "galaxy-z-fold-5",
    slug: "galaxy-z-fold-5",
    name: "Samsung Galaxy Z Fold 5",
    description: "Z Fold 5, 7.6” ekran i palosshëm, 12GB RAM.",
    price: 2050.59, // 2000.59 + 50
    images: [samsungzfold],
    specs: {
      Ekrani: "7.6” Foldable Dynamic AMOLED 2X, 120Hz",
      Procesori: "Snapdragon 8 Gen 2",
      Memoria: "256GB",
      RAM: "12GB",
      "Kamera Kryesore": "50MP + 12MP + 10MP",
      "Kamera Selfie": "10MP",
      Bateria: "4400mAh",
      Ngjyra: "Icy Blue",
      Garancia: "12 muaj",
    },
  category: "samsung",
  },
  {
    id: "galaxy-a15",
    slug: "galaxy-a15",
    name: "Samsung Galaxy A15",
    description: "A15, 6.5” ekran, 128GB, kamera të avancuara.",
    price: 319, // 269 + 50
    images: [samsungA15],
    specs: {
      Ekrani: "6.5” Super AMOLED, 90Hz",
      Procesori: "Mediatek Helio G99",
      Memoria: "128GB",
      RAM: "4GB",
      "Kamera Kryesore": "50MP + 5MP + 2MP",
      "Kamera Selfie": "13MP",
      Bateria: "5000mAh",
      Ngjyra: "Blue Black",
      Garancia: "12 muaj",
    },
  category: "samsung",
  },
];

export default samsungProducts;
