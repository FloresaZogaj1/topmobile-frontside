// src/data/iphoneProducts.js

import iphone15ProMaxNatural from "../assets/iphone_15_pro_max_natural_titanium_pdp_image_position_2_e21078a9-1525-4aaf-9a57-80a992149deb-removebg-preview.png";
import iphone14ProSpaceBlack from "../assets/iPhone_14_Pro_Space_Black_Pure_Back_iPhone_14_Pro_Space_Black_Pure_Front_2-up_Screen__USEN-removebg-preview.webp";
import iphone16Ultramarine from "../assets/iPhone_16_Pro_Max_Natural_Titanium_PDP_Image_Position_1__en-IN_76cf3262-ae6a-46aa-880f-d00b0b0dd8b1__1_-removebg-preview.webp";
import iphone17ProMaxCosmicOrange from "../assets/iPhone_17_Pro_Max_Cosmic_Orange_PDP_Image_Position_1_Cosmic_Orange_Colour__MY-EN__1_-removebg-preview.png";
import iphone17ProMaxDeepBlue from "../assets/iPhone_17_Pro_Max_Deep_Blue_PDP_Image_Position_1_Deep_Blue_Colour__MY-EN__1_-removebg-preview.webp";
import iphoneAirLightGold from "../assets/iPhone_Air_Sky_Blue_PDP_Image_Position_1_Sky_Blue_Colour__MY-EN-removebg-preview (2).png";
import iphone14ProDeepPurple from "../assets/iPhone_14_Pro_Deep_Purple_Pure_Back_iPhone_14_Pro_Deep_Purple_Pure_Front_2-up_Screen__USEN-removebg-preview.webp";
import iphone17MaxSilver from "../assets/iPhone_17_Pro_Max_Silver_PDP_Image_Position_1_Silver_Colour__MY-EN-removebg-preview.png";
import iphone17 from "../assets/iphonee 17.png";
import iphone17i from "../assets/iphoneee17.png";
import iphoneair from "../assets/iPhone_Air_Light_Gold_PDP_Image_Position_1_Light_Gold_Colour__MY-EN-removebg-preview (1).webp"
import iphoneeair from "../assets/iPhone_Air_Space_Black_PDP_Image_Position_1_Space_Black_Colour__MY-EN-removebg-preview.png"
import iphone16promax from "../assets/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_919e8584-f2b2-422d-a165-7b2e69157f3f__2_-removebg-preview.png";
import iphone16promm from "../assets/iPhone_16_Pro_Max_White_Titanium_PDP_Image_Position_1__en-IN_eba16b29-a280-4119-91a7-0a2432e06cdf-removebg-preview (1).png";
import iphone16 from "../assets/iPhone_16.png";
import iphone166 from "../assets/iPhone_16_Teal_PDP_Image_Position_1a_Teal_Colour__SG-EN__1_-removebg-preview.png"
import iphone16pink from "../assets/iPhone_16_Pink_PDP_Image_Position_1__en-IN-removebg-preview.png"
// Base specs per seri – i përdorim dhe veç ndryshojmë memorien / ngjyrën
const specs17ProMaxBase = {
  Ekrani: "6.9” Super Retina XDR OLED, 120Hz",
  Procesori: "Apple A19 Pro",
  RAM: "8GB",
  "Kamera Kryesore": "48MP + 12MP + 12MP (Periscope)",
  "Kamera Selfie": "12MP",
  Bateria: "4600mAh, MagSafe",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 19",
  Garancia: "12 muaj",
};

const specs17ProBase = {
  Ekrani: "6.3” Super Retina XDR OLED, 120Hz",
  Procesori: "Apple A19 Pro",
  RAM: "8GB",
  "Kamera Kryesore": "48MP + 12MP + 12MP (Telephoto)",
  "Kamera Selfie": "12MP",
  Bateria: "4300mAh, MagSafe",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 19",
  Garancia: "12 muaj",
};

const specs17Base = {
  Ekrani: "6.3” Super Retina XDR OLED",
  Procesori: "Apple A18",
  RAM: "6GB",
  "Kamera Kryesore": "48MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "4200mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 18",
  Garancia: "12 muaj",
};

const specs17AirBase = {
  Ekrani: "6.7” OLED, 120Hz",
  Procesori: "Apple A18",
  RAM: "6GB",
  "Kamera Kryesore": "48MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "4300mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 18",
  Garancia: "12 muaj",
};

const specs16ProMaxBase = {
  Ekrani: "6.9” Super Retina XDR OLED, 120Hz",
  Procesori: "Apple A18 Pro",
  RAM: "8GB",
  "Kamera Kryesore": "48MP + 12MP + 12MP (Periscope)",
  "Kamera Selfie": "12MP",
  Bateria: "4685mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 18",
  Garancia: "12 muaj",
};

const specs16ProBase = {
  Ekrani: "6.3” Super Retina XDR OLED, 120Hz",
  Procesori: "Apple A18 Pro",
  RAM: "8GB",
  "Kamera Kryesore": "48MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3597mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 18",
  Garancia: "12 muaj",
};

const specs16Base = {
  Ekrani: "6.1” Super Retina XDR OLED",
  Procesori: "Apple A18",
  RAM: "6GB",
  "Kamera Kryesore": "48MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3561mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 18",
  Garancia: "12 muaj",
};

const specs16PlusBase = {
  Ekrani: "6.7” Super Retina XDR OLED",
  Procesori: "Apple A18",
  RAM: "6GB",
  "Kamera Kryesore": "48MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "4000mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 18",
  Garancia: "12 muaj",
};

const specs15ProMaxBase = {
  Ekrani: "6.7” Super Retina XDR OLED, 120Hz",
  Procesori: "Apple A17 Pro",
  RAM: "8GB",
  "Kamera Kryesore": "48MP + 12MP + 12MP (Periscope)",
  "Kamera Selfie": "12MP",
  Bateria: "4422mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 17",
  Garancia: "12 muaj",
};

const specs15ProBase = {
  Ekrani: "6.1” Super Retina XDR OLED, 120Hz",
  Procesori: "Apple A17 Pro",
  RAM: "8GB",
  "Kamera Kryesore": "48MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3274mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 17",
  Garancia: "12 muaj",
};

const specs15Base = {
  Ekrani: "6.1” Super Retina XDR OLED",
  Procesori: "Apple A16 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "48MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3349mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 17",
  Garancia: "12 muaj",
};

const specs15PlusBase = {
  Ekrani: "6.7” Super Retina XDR OLED",
  Procesori: "Apple A16 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "48MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "4383mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 17",
  Garancia: "12 muaj",
};

const specs14ProMaxBase = {
  Ekrani: "6.7” OLED, 120Hz",
  Procesori: "Apple A16 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "48MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "4323mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 16",
  Garancia: "12 muaj",
};

const specs14ProBase = {
  Ekrani: "6.1” OLED, 120Hz",
  Procesori: "Apple A16 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "48MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3200mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 16",
  Garancia: "12 muaj",
};

const specs14Base = {
  Ekrani: "6.1” Super Retina XDR OLED",
  Procesori: "Apple A15 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3279mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 16",
  Garancia: "12 muaj",
};

const specs14PlusBase = {
  Ekrani: "6.7” Super Retina XDR OLED",
  Procesori: "Apple A15 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "4323mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 16",
  Garancia: "12 muaj",
};

const specs13ProMaxBase = {
  Ekrani: "6.7” Super Retina XDR OLED, 120Hz",
  Procesori: "Apple A15 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "12MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "4352mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 15",
  Garancia: "12 muaj",
};

const specs13ProBase = {
  Ekrani: "6.1” Super Retina XDR OLED, 120Hz",
  Procesori: "Apple A15 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "12MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3095mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 15",
  Garancia: "12 muaj",
};

const specs13Base = {
  Ekrani: "6.1” Super Retina XDR OLED",
  Procesori: "Apple A15 Bionic",
  RAM: "4GB",
  "Kamera Kryesore": "12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3240mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 15",
  Garancia: "12 muaj",
};

const specs12ProMaxBase = {
  Ekrani: "6.7” Super Retina XDR OLED",
  Procesori: "Apple A14 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "12MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3687mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 14",
  Garancia: "12 muaj",
};

const specs12ProBase = {
  Ekrani: "6.1” Super Retina XDR OLED",
  Procesori: "Apple A14 Bionic",
  RAM: "6GB",
  "Kamera Kryesore": "12MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "2815mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 14",
  Garancia: "12 muaj",
};

const specs12Base = {
  Ekrani: "6.1” Super Retina XDR OLED",
  Procesori: "Apple A14 Bionic",
  RAM: "4GB",
  "Kamera Kryesore": "12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "2815mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 14",
  Garancia: "12 muaj",
};

const specs11ProMaxBase = {
  Ekrani: "6.5” Liquid Retina IPS LCD",
  Procesori: "Apple A13 Bionic",
  RAM: "4GB",
  "Kamera Kryesore": "12MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3969mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 13",
  Garancia: "12 muaj",
};

const specs11ProBase = {
  Ekrani: "5.8” OLED",
  Procesori: "Apple A13 Bionic",
  RAM: "4GB",
  "Kamera Kryesore": "12MP + 12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3046mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 13",
  Garancia: "12 muaj",
};

const specs11Base = {
  Ekrani: "6.1” Liquid Retina IPS LCD",
  Procesori: "Apple A13 Bionic",
  RAM: "4GB",
  "Kamera Kryesore": "12MP + 12MP",
  "Kamera Selfie": "12MP",
  Bateria: "3110mAh",
  SIM: "Nano SIM + eSIM",
  "Sistemi Operativ": "iOS 13",
  Garancia: "12 muaj",
};

const iphoneProducts = [
  // ---------------- iPhone 17 collection (NEW) ----------------

  
  {
    id: "iphone-17-pro-max-1tb",
    name: "Apple iPhone 17 Pro Max - 1TB",
    description: "Apple iPhone 17 Pro Max, 1TB.",
    price: 1820 + 50,
    oldPrice: 2200 + 50,
  images: [iphone17ProMaxCosmicOrange, iphone17ProMaxDeepBlue, iphone17MaxSilver],
    brand: "Apple",
    sku: "IP17PM1TB",
    rating: 5,
    specs: {
      ...specs17ProMaxBase,
      Memoria: "1TB",
      Ngjyra: "Blue & White",
    },
    category: "iphone",
  },
  {
    id: "iphone-17-pro-max-512",
    name: "Apple iPhone 17 Pro Max - 512GB (Blue White)",
    description: "Apple iPhone 17 Pro Max, 512GB — Blue White.",
    price: 1420 + 50,
    oldPrice: 1800 + 50,
      images: [ iphone17ProMaxDeepBlue, iphone17MaxSilver,iphone17ProMaxCosmicOrange],
    brand: "Apple",
    sku: "IP17PM512",
    rating: 5,
    specs: {
      ...specs17ProMaxBase,
      Memoria: "512GB",
      Ngjyra: "Blue & White",
    },
    category: "iphone",
  },
  {
    id: "iphone-17-pro-max-256",
    name: "Apple iPhone 17 Pro Max - 256GB (Blue & White)",
    description: "Apple iPhone 17 Pro Max, 256GB — Blue & White.",
    price: 1209 + 50,
    oldPrice: 1650 + 50,
  images: [ iphone17ProMaxDeepBlue, iphone17MaxSilver,iphone17ProMaxCosmicOrange],
    brand: "Apple",
    sku: "IP17PM256",
    rating: 5,
    specs: {
      ...specs17ProMaxBase,
      Memoria: "256GB",
      Ngjyra: "Blue & White",
    },
    category: "iphone",
  },

  {
    id: "iphone-17-pro-1tb",
    name: "Apple iPhone 17 Pro - 1TB",
    description: "Apple iPhone 17 Pro, 1TB.",
    price: 1530 + 50,
    oldPrice: 1800 + 50,
  images: [iphone17MaxSilver,iphone17ProMaxCosmicOrange, iphone17ProMaxDeepBlue ],
    brand: "Apple",
    sku: "IP17P1TB",
    rating: 5,
    specs: {
      ...specs17ProBase,
      Memoria: "1TB",
      Ngjyra: "Blue & White",
    },
    category: "iphone",
  },
  {
    id: "iphone-17-pro-512",
    name: "Apple iPhone 17 Pro - 512GB",
    description: "Apple iPhone 17 Pro, 512GB.",
    price: 1350 + 50,
    oldPrice: 1900 + 50,
      images: [iphone17MaxSilver,iphone17ProMaxCosmicOrange, iphone17ProMaxDeepBlue ],
    brand: "Apple",
    sku: "IP17P512",
    rating: 5,
    specs: {
      ...specs17ProBase,
      Memoria: "512GB",
      Ngjyra: "Blue & White",
    },
    category: "iphone",
  },
  {
    id: "iphone-17-pro-256",
    name: "Apple iPhone 17 Pro - 256GB (Blue & White)",
    description: "Apple iPhone 17 Pro, 256GB — Blue & White.",
    price: 1130 + 50,
    oldPrice: 1550 + 50,
  images: [iphone17ProMaxDeepBlue,iphone17MaxSilver,iphone17ProMaxCosmicOrange ],
    brand: "Apple",
    sku: "IP17P256",
    rating: 5,
    specs: {
      ...specs17ProBase,
      Memoria: "256GB",
      Ngjyra: "Blue & White",
    },
    category: "iphone",
  },

  {
    id: "iphone-17-256",
    name: "Apple iPhone 17 - 256GB",
    description: "Apple iPhone 17, 256GB.",
    price: 809 + 50,
    oldPrice: 1000 + 50,
    images: [iphone16Ultramarine,],
    images:[iphone17i,iphone17,iphone16Ultramarine
    ],
    brand: "Apple",
    sku: "IP17256",
    rating: 5,
    specs: {
      ...specs17Base,
      Memoria: "256GB",
      Ngjyra: "Gold",
    },
    category: "iphone",
  },

  {
    id: "iphone-air-512",
    name: "Apple iPhone Air - 512GB",
    description: "Apple iPhone Air, 512GB.",
    price: 1020 + 50,
    oldPrice: 1300 + 50,
    images: [iphoneAirLightGold, iphoneeair, iphoneair],
    brand: "Apple",
    sku: "IPAIR512",
    rating: 5,
    specs: {
      ...specs17AirBase,
      Memoria: "512GB",
      Ngjyra: "Gold",
    },
    category: "iphone",
  },
  {
    id: "iphone-air-256",
    name: "Apple iPhone Air - 256GB",
    description: "Apple iPhone Air, 256GB.",
    price: 820 + 50,
    oldPrice: 1600 + 50,
    images: [iphoneair,iphoneAirLightGold, iphoneeair],
    brand: "Apple",
    sku: "IPAIR256",
    rating: 5,
    specs: {
      ...specs17AirBase,
      Memoria: "256GB",
      Ngjyra: "Gold",
    },
    category: "iphone",
  },

  // ---------------- Telefona (Pa pako) LikeNew – iPhone 16 ----------------

  {
    id: "iphone-16-pro-max-256-likenew",
    name: "Apple iPhone 16 Pro Max 256GB (LikeNew)",
    description: "Apple iPhone 16 Pro Max 256GB [Pa pako LikeNew].",
    price: 795 + 50,
    oldPrice: 999 + 50,
    images: [iphone16Ultramarine, iphone16promax,iphone16promm],
    brand: "Apple",
    sku: "IP16PM256LN",
    rating: 5,
    specs: {
      ...specs16ProMaxBase,
      Memoria: "256GB",
      Ngjyra: "Ultramarine",
    },
    category: "iphone",
  },
  {
    id: "iphone-16-pro-128-likenew",
    name: "Apple iPhone 16 Pro 128GB (LikeNew)",
    description: "Apple iPhone 16 Pro 128GB [Pa pako LikeNew].",
    price: 639 + 50,
    oldPrice: 850 + 50,
    images: [ iphone16promax, iphone16Ultramarine,iphone16promm],
    brand: "Apple",
    sku: "IP16P128LN",
    rating: 5,
    specs: {
      ...specs16ProBase,
      Memoria: "128GB",
      Ngjyra: "Ultramarine",
    },
    category: "iphone",
  },
  {
    id: "iphone-16-pro-256-likenew",
    name: "Apple iPhone 16 Pro 256GB (LikeNew)",
    description: "Apple iPhone 16 Pro 256GB [Pa pako LikeNew].",
    price: 685 + 50,
    oldPrice: 850 + 50,
    images: [ iphone16promm, iphone16Ultramarine,iphone16promax],
    brand: "Apple",
    sku: "IP16P256LN",
    rating: 5,
    specs: {
      ...specs16ProBase,
      Memoria: "256GB",
      Ngjyra: "Ultramarine",
    },
    category: "iphone",
  },
  {
    id: "iphone-16-pro-1tb-likenew",
    name: "Apple iPhone 16 Pro 1TB (LikeNew)",
    description: "Apple iPhone 16 Pro 1TB [Pa pako LikeNew].",
    price: 709 + 50,
    oldPrice: 850 + 50,
    images: [iphone16Ultramarine, iphone16promax,iphone16promm],
    brand: "Apple",
    sku: "IP16P1TBLN",
    rating: 5,
    specs: {
      ...specs16ProBase,
      Memoria: "1TB",
      Ngjyra: "Ultramarine",
    },
    category: "iphone",
  },
  {
    id: "iphone-16-128-likenew",
    name: "Apple iPhone 16 128GB (LikeNew)",
    description: "Apple iPhone 16 128GB [Pa pako LikeNew].",
    price: 590 + 50,
    oldPrice: 899 + 50,
    images: [iphone16, iphone166, iphone16pink],
    brand: "Apple",
    sku: "IP16128LN",
    rating: 5,
    specs: {
      ...specs16Base,
      Memoria: "128GB",
      Ngjyra: "Ultramarine",
    },
    category: "iphone",
  },
  {
    id: "iphone-16-256-likenew",
    name: "Apple iPhone 16 256GB (LikeNew)",
    description: "Apple iPhone 16 256GB [Pa pako LikeNew].",
    price: 666 + 50,
    oldPrice: 705 + 50,
    images: [ iphone166,  iphone16, iphone16pink],
    brand: "Apple",
    sku: "IP16256LN",
    rating: 5,
    specs: {
      ...specs16Base,
      Memoria: "256GB",
      Ngjyra: "Ultramarine",
    },
    category: "iphone",
  },
  {
    id: "iphone-16-plus-128-likenew",
    name: "Apple iPhone 16 Plus 128GB (LikeNew)",
    description: "Apple iPhone 16 Plus 128GB [Pa pako LikeNew].",
    price: 635 + 50,
    oldPrice: 1180 + 50,
    images: [ iphone16pink,  iphone16, iphone166],
    brand: "Apple",
    sku: "IP16PL128LN",
    rating: 5,
    specs: {
      ...specs16PlusBase,
      Memoria: "128GB",
      Ngjyra: "Ultramarine",
    },
    category: "iphone",
  },


];

export default iphoneProducts;
