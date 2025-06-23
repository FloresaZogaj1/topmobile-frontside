import foto1 from "../assets/freepik__upload__70538-removebg-preview.png"; // Foto lokale
import fotto2 from "../assets/DSC06547_alt-removebg-preview.png"
import foto3 from "../assets/ChatGPT_Image_Jun_16__2025__02_13_41_PM-removebg-preview.png"
import foto from "../assets/ChatGPT_Image_Jun_16__2025__02_19_16_PM-removebg-preview.png"
import fotos from "../assets/freepik_br_2e5b1fb8-c95c-47e1-b93d-5f9180aa0737.png"
import fotet from "../assets/ChatGPT Image Jun 16, 2025, 02_36_14 PM-Photoroom.png"

const demoProducts = [
    {
      id: "iphone-14-pro-max",
      name: "iPhone 14 Pro Max",
      description: "Smartphone Apple, 256GB, 5G",
      category: "phone",
      price: 1099,
      oldPrice: 1199,
      images: [foto1],
      specs: {
        "Kamera": "48MP + 12MP + 12MP",
        "Memoria": "256GB",
        "Ekrani": "6.7” OLED",
        "Ngjyra": "Purple",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "samsung-galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      description: "6.8” QHD+, 12GB RAM, 200MP kamera, S-Pen.",
      category: "phone",
      price: 1150,
      oldPrice: 1270,
      images: [fotto2],
        
        
    
      specs: {
        "Ekrani": "6.8” QHD+ AMOLED",
        "Kamera": "200MP + 12MP + 10MP + 10MP",
        "RAM": "12GB",
        "Memoria": "512GB",
        "Bateria": "5000mAh",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "samsung-galaxy-a55-5g",
      name: "Samsung Galaxy A55 5G",
      description: "6.6” Super AMOLED, 128GB/256GB, 50MP kamera, 5000mAh.",
      category: "phone",
      price: 390,
      oldPrice: 420,
      images: [
        "https://img-resizer.cyberport.de/cp/images/684x684/240402125736400501900002E"
      ],
      specs: {
        "Ekrani": "6.6” Super AMOLED",
        "Kamera": "50MP + 12MP + 5MP",
        "Memoria": "128GB/256GB",
        "Bateria": "5000mAh",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "gift-card-100",
      name: "Gift Card 100€",
      description: "Kartë dhurate për çdo rast.",
      category: "giftcard",
      price: 100,
      images: [foto3],
      specs: {}
    },
    {
      id: "iphone-15",
      name: "iPhone 15",
      description: "Apple iPhone 15, 128GB, Midnight Black",
      category: "phone",
      price: 1029,
      oldPrice: 1099,
      images: [
        "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg"
      ],
      specs: {
        "Ekrani": "6.1” OLED",
        "Kamera": "48MP + 12MP",
        "Memoria": "128GB",
        "Ngjyra": "Midnight Black",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "samsung-galaxy-z-flip-5",
      name: "Samsung Galaxy Z Flip 5",
      description: "Telefon i palosshëm, 6.7” AMOLED, 8GB RAM, 3700mAh.",
      category: "phone",
      price: 780,
      oldPrice: 890,
      images: [
        "https://static0.pocketlintimages.com/wordpress/wp-content/uploads/2024/03/samsung_flip_5.jpg"
      ],
      specs: {
        "Ekrani": "6.7” AMOLED",
        "RAM": "8GB",
        "Bateria": "3700mAh",
        "Lloji": "Telefon i palosshëm",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "clear-case-iphone-15",
      name: "Clear Case for iPhone 15",
      description: "Mbrojtëse transparente për iPhone 15.",
      category: "case",
      price: 15,
      images: [
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MPT93?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1693511639266"
      ],
      specs: {
        "Materiali": "TPU",
        "Përputhshmëria": "iPhone 15",
        "Ngjyra": "Transparente",
        "Garancia": "6 muaj"
      }
    },
    {
      id: "premium-case-iphone-14-pro-max",
      name: "Premium Case iPhone 14 Pro Max",
      description: "Case silikoni premium, anti-shock.",
      category: "case",
      price: 19,
      images: [
        "https://www.elago.com/cdn/shop/products/S14SC67PRO-LBL_Amazon_62203cc8-edbe-4a74-af5d-9ccdf290cd96.jpg?v=1716938875"
      ],
      specs: {
        "Materiali": "Silikon",
        "Tipi": "Anti-shock",
        "Përputhshmëria": "iPhone 14 Pro Max",
        "Garancia": "6 muaj"
      }
    },
    {
      id: "leather-samsung-case",
      name: "Leather Samsung Case",
      description: "Mbrojtëse lëkure premium për Samsung S24.",
      category: "case",
      price: 28,
      images: [
        "https://m.media-amazon.com/images/I/718LKReM5iL._AC_UF1000,1000_QL80_.jpg"
      ],
      specs: {
        "Materiali": "Lëkurë",
        "Përputhshmëria": "Samsung S24",
        "Garancia": "6 muaj"
      }
    },
    {
      id: "gift-card-50",
      name: "Gift Card 50€",
      description: "Kartë dhurate për çdo rast.",
      category: "giftcard",
      price: 50,
      images: [foto],
      specs: {}
    },
    {
      id: "gift-card-200",
      name: "Gift Card 200€",
      description: "Dhuratë perfekte për familjarë.",
      category: "giftcard",
      price: 200,
      images: [fotos],
      specs: {}
    },
    {
      id: "iphone-15-pro",
      name: "iPhone 15 Pro",
      description: "6.1” Super Retina XDR, 128GB, Kamera 48MP, Titanium.",
      category: "phone",
      price: 1199,
      oldPrice: 1299,
      images: [
        "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg"
      ],
      specs: {
        "Ekrani": "6.1” Super Retina XDR",
        "Kamera": "48MP",
        "Memoria": "128GB",
        "Materiali": "Titanium",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "samsung-galaxy-s23-fe",
      name: "Samsung Galaxy S23 FE",
      description: "6.4” FHD+, 8GB RAM, 128GB, 50MP kamera.",
      category: "phone",
      price: 600,
      oldPrice: 680,
      images: [
        "https://adminapi.applegadgetsbd.com/storage/media/large/Cream-4265.jpg"
      ],
      specs: {
        "Ekrani": "6.4” FHD+",
        "Kamera": "50MP",
        "RAM": "8GB",
        "Memoria": "128GB",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "apple-watch-series-9",
      name: "Apple Watch Series 9",
      description: "GPS 45mm, Midnight Aluminium Case with Sport Band.",
      category: "phone",
      price: 459,
      oldPrice: 499,
      images: [
        "https://snapcraze.co.za/wp-content/uploads/2023/11/series-9-45mm-black.jpeg"
      ],
      specs: {
        "Modeli": "Series 9",
        "Diametri": "45mm",
        "Ngjyra": "Midnight",
        "Materiali": "Alumini",
        "Tipi": "GPS",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "airpods-pro-2nd-gen",
      name: "AirPods Pro (2nd Gen)",
      description: "Apple AirPods Pro me ANC, MagSafe Case.",
      category: "case",
      price: 239,
      oldPrice: 279,
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1660803972361"
      ],
      specs: {
        "Tipi": "True Wireless",
        "ANC": "Po",
        "Kutia": "MagSafe",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "samsung-galaxy-buds2-pro",
      name: "Samsung Galaxy Buds2 Pro",
      description: "Wireless, ANC, 5-18h battery life, Bluetooth 5.3.",
      category: "case",
      price: 165,
      oldPrice: 199,
      images: [
        "https://www.recellexchange.com/cdn/shop/files/3_214d8a6a-d399-4125-8d18-5a38e6ff8281.png?v=1689105780"
      ],
      specs: {
        "Tipi": "Wireless",
        "ANC": "Po",
        "Bateria": "5-18 orë",
        "Bluetooth": "5.3",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "iphone-13",
      name: "iPhone 13",
      description: "128GB, 6.1” Super Retina XDR, 12MP kamera.",
      category: "phone",
      price: 829,
      oldPrice: 929,
      images: [
        "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg"
      ],
      specs: {
        "Ekrani": "6.1” Super Retina XDR",
        "Kamera": "12MP",
        "Memoria": "128GB",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "samsung-galaxy-m34-5g",
      name: "Samsung Galaxy M34 5G",
      description: "6.5” Super AMOLED, 8GB RAM, 6000mAh bateri.",
      category: "phone",
      price: 240,
      oldPrice: 299,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr-kY1S5Lsht5gALPUicmv2CQfK5BFdSHliw&s"
      ],
      specs: {
        "Ekrani": "6.5” Super AMOLED",
        "RAM": "8GB",
        "Bateria": "6000mAh",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "gift-card-75",
      name: "Gift Card 75€",
      description: "Dhuratë ideale për çdo rast.",
      category: "giftcard",
      price: 75,
      images: [fotet],
      specs: {}
    },
    {
      id: "iphone-15-plus",
      name: "iPhone 15 Plus",
      description: "6.7” Super Retina XDR, 128GB, Dynamic Island.",
      category: "phone",
      price: 1099,
      oldPrice: 1199,
      images: [
        "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg"
      ],
      specs: {
        "Ekrani": "6.7” Super Retina XDR",
        "Memoria": "128GB",
        "Veçori": "Dynamic Island",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "samsung-galaxy-s22",
      name: "Samsung Galaxy S22",
      description: "6.1” FHD+, 8GB RAM, Snapdragon 8 Gen 1.",
      category: "phone",
      price: 580,
      oldPrice: 650,
      images: [
        "https://cdn.mos.cms.futurecdn.net/SdRAmQjQhsRwiKY9BHX3YU.jpg"
      ],
      specs: {
        "Ekrani": "6.1” FHD+",
        "RAM": "8GB",
        "Procesori": "Snapdragon 8 Gen 1",
        "Garancia": "12 muaj"
      }
    },
    {
      id: "otterbox-defender-iphone-14",
      name: "OtterBox Defender for iPhone 14",
      description: "Mbrojtëse heavy-duty për iPhone 14, black.",
      category: "case",
      price: 29,
      oldPrice: 35,
      images: [
        "https://www.caserace.net/cdn/shop/products/14PlusGrayBlue_2_-1.jpg?v=1669972725"
      ],
      specs: {
        "Tipi": "Heavy-duty",
        "Përputhshmëria": "iPhone 14",
        "Ngjyra": "Black",
        "Garancia": "12 muaj"
      }
    }
  ];
  export default demoProducts;
