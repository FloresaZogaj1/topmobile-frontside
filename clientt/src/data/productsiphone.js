import foto11 from "../assets/a0c2a517-ca1d-4129-9f3f-e69f131cd94a_size3840_cropCenter-removebg-preview.png";
import foto8 from "../assets/iphone-13-png--0b6bc714e9404b74a0c8-removebg-preview.png";
import foto12 from "../assets/Remove-bg.ai_1725099301061-800x800-removebg-preview.png";
import foto20 from "../assets/apple-iphone-11-pro-max-512gb-green-removebg-preview.png";

const iphoneProducts = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    description: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium.",
    price: 1240,
    oldPrice: 1349,
    images: [
      "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_SY741_.jpg"
    ],
    specs: {
      "Ekrani": "6.7” Super Retina XDR OLED, 120Hz",
      "Procesori": "Apple A17 Pro",
      "Memoria": "256GB",
      "RAM": "8GB",
      "Kamera Kryesore": "48MP + 12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "4422mAh, MagSafe",
      "Ngjyra": "Blue Titanium",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "Apple iPhone 15 Pro, 128GB, Titanium.",
    price: 1199,
    oldPrice: 1299,
    images: [
      "https://m.media-amazon.com/images/I/71v2jVh6nIL._AC_SY741_.jpg"
    ],
    specs: {
      "Ekrani": "6.1” Super Retina XDR OLED, 120Hz",
      "Procesori": "Apple A17 Pro",
      "Memoria": "128GB",
      "RAM": "8GB",
      "Kamera Kryesore": "48MP + 12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "3274mAh, MagSafe",
      "Ngjyra": "Titanium",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    description: "Apple iPhone 15 Plus, 128GB, Pink.",
    price: 1099,
    oldPrice: 1199,
    images: [
      "https://www.reviews.org/app/uploads/2025/03/Pixel_9a_model-removebg-preview-300x300.webp"
    ],
    specs: {
      "Ekrani": "6.7” Super Retina XDR OLED",
      "Procesori": "Apple A16 Bionic",
      "Memoria": "128GB",
      "RAM": "6GB",
      "Kamera Kryesore": "48MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "4383mAh",
      "Ngjyra": "Pink",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    description: "Apple iPhone 14 Pro Max, 256GB, Purple.",
    price: 1099,
    oldPrice: 1199,
    images: [
      foto8,
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-2.jpg"
    ],
    specs: {
      "Ekrani": "6.7” OLED, 120Hz",
      "Procesori": "Apple A16 Bionic",
      "Memoria": "256GB",
      "RAM": "6GB",
      "Kamera Kryesore": "48MP + 12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "4323mAh",
      "Ngjyra": "Purple",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    description: "Apple iPhone 14, 128GB, Blue.",
    price: 799,
    oldPrice: 899,
    images: [
      "https://www.pngplay.com/wp-content/uploads/15/iPhone-14-PNG-Free-File-Download.png"
    ],
    specs: {
      "Ekrani": "6.1” Liquid Retina",
      "Procesori": "Apple A15 Bionic",
      "Memoria": "128GB",
      "RAM": "6GB",
      "Kamera Kryesore": "12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "3279mAh",
      "Ngjyra": "Blue",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    description: "Apple iPhone 13 Pro, 128GB, Graphite.",
    price: 899,
    oldPrice: 1049,
    images: [
      "https://thephonepreneur.com/wp-content/uploads/2025/03/Apple_iPhone-13-Pro_iPhone-13-Pro-max-removebg-preview.png"
    ],
    specs: {
      "Ekrani": "6.1” Super Retina XDR OLED, 120Hz",
      "Procesori": "Apple A15 Bionic",
      "Memoria": "128GB",
      "RAM": "6GB",
      "Kamera Kryesore": "12MP + 12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "3095mAh",
      "Ngjyra": "Graphite",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-se-2022",
    name: "iPhone SE (2022)",
    description: "Apple iPhone SE (2022), 64GB, Red.",
    price: 429,
    oldPrice: 489,
    images: [
      "https://best-magazin.com/image/cache/catalog/Apple/Iphone/Iphone%20SE%202022/Remove-bg.ai_1725130989745-800x800.png"
    ],
    specs: {
      "Ekrani": "4.7” Retina HD",
      "Procesori": "Apple A15 Bionic",
      "Memoria": "64GB",
      "RAM": "4GB",
      "Kamera Kryesore": "12MP",
      "Kamera Selfie": "7MP",
      "Bateria": "2018mAh",
      "Ngjyra": "Red",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    description: "Apple iPhone 13, 128GB, Blue.",
    price: 749,
    oldPrice: 829,
    images: [
      foto8
    ],
    specs: {
      "Ekrani": "6.1” Super Retina XDR OLED",
      "Procesori": "Apple A15 Bionic",
      "Memoria": "128GB",
      "RAM": "4GB",
      "Kamera Kryesore": "12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "3240mAh",
      "Ngjyra": "Blue",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-13-mini",
    name: "iPhone 13 Mini",
    description: "Apple iPhone 13 Mini, 128GB, Starlight.",
    price: 699,
    oldPrice: 799,
    images: [
      foto11
    ],
    specs: {
      "Ekrani": "5.4” Super Retina XDR OLED",
      "Procesori": "Apple A15 Bionic",
      "Memoria": "128GB",
      "RAM": "4GB",
      "Kamera Kryesore": "12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "2438mAh",
      "Ngjyra": "Starlight",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    description: "Apple iPhone 12 Pro Max, 256GB, Gold.",
    price: 849,
    oldPrice: 949,
    images: [
      "https://sopiguard.com/cdn/shop/products/ip12pro3mbrgun.jpg?v=1603171476"
    ],
    specs: {
      "Ekrani": "6.7” Super Retina XDR OLED",
      "Procesori": "Apple A14 Bionic",
      "Memoria": "256GB",
      "RAM": "6GB",
      "Kamera Kryesore": "12MP + 12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "3687mAh",
      "Ngjyra": "Gold",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    description: "Apple iPhone 12, 128GB, White.",
    price: 629,
    oldPrice: 699,
    images: [
      foto12
    ],
    specs: {
      "Ekrani": "6.1” Super Retina XDR OLED",
      "Procesori": "Apple A14 Bionic",
      "Memoria": "128GB",
      "RAM": "4GB",
      "Kamera Kryesore": "12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "2815mAh",
      "Ngjyra": "White",
      "Garancia": "12 muaj"
    },
    category: "phone"
  },
  {
    id: "iphone-11",
    name: "iPhone 11",
    description: "Apple iPhone 11, 128GB, Green.",
    price: 499,
    oldPrice: 559,
    images: [
      foto20
    ],
    specs: {
      "Ekrani": "6.1” Liquid Retina IPS LCD",
      "Procesori": "Apple A13 Bionic",
      "Memoria": "128GB",
      "RAM": "4GB",
      "Kamera Kryesore": "12MP + 12MP",
      "Kamera Selfie": "12MP",
      "Bateria": "3110mAh",
      "Ngjyra": "Green",
      "Garancia": "12 muaj"
    },
    category: "phone"
  }
];

export default iphoneProducts;
