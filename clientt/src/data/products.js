// Use placeholder URLs where local assets are missing to prevent build errors
const PLACEHOLDER = "https://via.placeholder.com/800x600?text=Top+Mobile";
const foto1 = PLACEHOLDER;
const fotto2 = PLACEHOLDER;
const foto3 = PLACEHOLDER;
const foto = PLACEHOLDER;
const fotos = PLACEHOLDER;
const fotet = PLACEHOLDER;
const foto31 = PLACEHOLDER;
const foto8 = PLACEHOLDER;


const demoProducts = [
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    description:
      "Smartphone Apple, 256GB, 5G, kamera profesionale dhe ekran OLED të avancuar.",
    category: "phone",
    // MobiFita 645€ -> +50€ = 695€
    price: 695,
    images: [foto1, "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg"],
    brand: "Apple",
    sku: "100001",
    rating: 5,
    specs: {
      "Display diagonal": "6.7” OLED",
      "Display resolution": "2796 x 1290 px",
      "Processor family": "Apple A16 Bionic",
      "Internal storage capacity": "256 GB",
      RAM: "6 GB",
      "Rear camera resolution": "48 MP + 12 MP + 12 MP",
      "Front camera": "12 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "iOS 16",
      Battery: "4323 mAh",
      "Product colour": "Purple",
      Weight: "240 g",
      Warranty: "12 muaj",
    },
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    description:
      "6.8” QHD+, 12GB RAM, 200MP kamera, S-Pen dhe ekran Dynamic AMOLED 2X.",
    category: "phone",
    // MobiFita 665€ -> +50€ = 715€
    price: 715,
    images: [fotto2],
    brand: "Samsung",
    sku: "100002",
    rating: 5,
    specs: {
      "Display diagonal": "6.8” Dynamic AMOLED 2X",
      "Display resolution": "3120 x 1440 px (QHD+)",
      "Processor family": "Snapdragon 8 Gen 3",
      "Internal storage capacity": "512 GB",
      RAM: "12 GB",
      "Rear camera resolution": "200 MP + 12 MP + 10 MP + 10 MP",
      "Front camera": "12 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "Android 14",
      Battery: "5000 mAh",
      "Product colour": "Black",
      Weight: "232 g",
      Warranty: "12 muaj",
      Pen: "S-Pen",
    },
  },
  {
    id: "samsung-galaxy-a55-5g",
    name: "Samsung Galaxy A55 5G",
    description:
      "6.6” Super AMOLED, 128GB/256GB, 50MP kamera, 5000mAh bateri.",
    category: "phone",
    // MobiFita 335€ (8/256) -> +50€ = 385€
    price: 385,
    images: [
      "https://img-resizer.cyberport.de/cp/images/684x684/240402125736400501900002E"
      
    ],
    brand: "Samsung",
    sku: "100003",
    rating: 4,
    specs: {
      "Display diagonal": "6.6” Super AMOLED",
      "Display resolution": "2340 x 1080 px",
      "Processor family": "Exynos 1480",
      "Internal storage capacity": "128GB/256GB",
      RAM: "8 GB",
      "Rear camera resolution": "50 MP + 12 MP + 5 MP",
      "Front camera": "32 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "Android 14",
      Battery: "5000 mAh",
      "Product colour": "Awesome Navy",
      Weight: "213 g",
      Warranty: "12 muaj",
    },
  },
  {
    id: "gift-card-100",
    name: "Gift Card 100€",
    description: "Kartë dhurate për çdo rast.",
    category: "giftcard",
    // Gift cards zakonisht = vlera nominale
    price: 100,
    images: [foto3],
    brand: "TopMobile",
    sku: "100004",
    rating: 0,
    specs: {
      Vlera: "100€",
      Lloji: "Gift Card fizike",
      "Përdorim": "Në të gjitha produktet",
      Afat: "Pa afat skadimi",
    },
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    description:
      "Apple iPhone 15, 128GB, Midnight Black, kamera të avancuara dhe ekran OLED.",
    category: "phone",
    // MobiFita 599€ -> +50€ = 649€
    price: 649,
    images: [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg"
      
    ],
    brand: "Apple",
    sku: "100005",
    rating: 5,
    specs: {
      "Display diagonal": "6.1” OLED",
      "Display resolution": "2556 x 1179 px",
      "Processor family": "Apple A16 Bionic",
      "Internal storage capacity": "128 GB",
      RAM: "6 GB",
      "Rear camera resolution": "48 MP + 12 MP",
      "Front camera": "12 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "iOS 17",
      Battery: "3349 mAh",
      "Product colour": "Midnight Black",
      Weight: "171 g",
      Warranty: "12 muaj",
    },
  },
  {
    id: "samsung-galaxy-z-flip-5",
    name: "Samsung Galaxy Z Flip 5",
    description:
      "Telefon i palosshëm, 6.7” AMOLED, 8GB RAM, 3700mAh bateri, dizajn unik.",
    category: "phone",
    // Referuar tregut në Kosovë (Aztechonline ofertë 699€)
    price: 699,
    images: [
      "https://static0.pocketlintimages.com/wordpress/wp-content/uploads/2024/03/samsung_flip_5.jpg"
      
    ],
    brand: "Samsung",
    sku: "100006",
    rating: 4,
    specs: {
      "Display diagonal": "6.7” AMOLED",
      "Display resolution": "2640 x 1080 px",
      "Processor family": "Snapdragon 8 Gen 2",
      "Internal storage capacity": "256 GB",
      RAM: "8 GB",
      "Rear camera resolution": "12 MP + 12 MP",
      "Front camera": "10 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "Android 13",
      Battery: "3700 mAh",
      "Product colour": "Graphite",
      Weight: "187 g",
      Warranty: "12 muaj",
      Type: "Telefon i palosshëm",
    },
  },
  {
    id: "clear-case-iphone-15",
    name: "Clear Case for iPhone 15",
    description:
      "Mbrojtëse transparente për iPhone 15, mbrojtje premium, përshtatje perfekte.",
    category: "case",
    // Neptun KS Happy Price 49.99€
    price: 49.99,
    images: [
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MPT93?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1693511639266",
    ],
    brand: "Apple",
    sku: "100007",
    rating: 5,
    specs: {
      Material: "TPU",
      Compatibility: "iPhone 15",
      Colour: "Transparente",
      Warranty: "6 muaj",
    },
  },
  {
    id: "premium-case-iphone-14-pro-max",
    name: "Premium Case iPhone 14 Pro Max",
    description: "Case silikoni premium, anti-shock, dizajn modern.",
    category: "case",
    // Çmim realist tregu lokal për case premium
    price: 39,
    images: [
      "https://www.elago.com/cdn/shop/products/S14SC67PRO-LBL_Amazon_62203cc8-edbe-4a74-af5d-9ccdf290cd96.jpg?v=1716938875",
    ],
    brand: "Elago",
    sku: "100008",
    rating: 4,
    specs: {
      Material: "Silikon",
      Type: "Anti-shock",
      Compatibility: "iPhone 14 Pro Max",
      Warranty: "6 muaj",
    },
  },
  {
    id: "leather-samsung-case",
    name: "Leather Samsung Case",
    description: "Mbrojtëse lëkure premium për Samsung S24.",
    category: "case",
    // Referencë çmimi Samsung EU ~49.99€
    price: 49.99,
    images: ["https://m.media-amazon.com/images/I/718LKReM5iL._AC_UF1000,1000_QL80_.jpg"],
    brand: "Samsung",
    sku: "100009",
    rating: 4,
    specs: {
      Material: "Lëkurë natyrale",
      Compatibility: "Samsung S24",
      Warranty: "6 muaj",
    },
  },
  {
    id: "gift-card-50",
    name: "Gift Card 50€",
    description: "Kartë dhurate për çdo rast.",
    category: "giftcard",
    price: 50,
    images: [foto],
    brand: "TopMobile",
    sku: "100010",
    rating: 0,
    specs: {
      Vlera: "50€",
      Lloji: "Gift Card fizike",
      "Përdorim": "Në të gjitha produktet",
      Afat: "Pa afat skadimi",
    },
  },
  {
    id: "gift-card-200",
    name: "Gift Card 200€",
    description: "Dhuratë perfekte për familjarë.",
    category: "giftcard",
    price: 200,
    images: [fotos],
    brand: "TopMobile",
    sku: "100011",
    rating: 0,
    specs: {
      Vlera: "200€",
      Lloji: "Gift Card fizike",
      "Përdorim": "Në të gjitha produktet",
      Afat: "Pa afat skadimi",
    },
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "6.1” Super Retina XDR, 128GB, Kamera 48MP, Titanium.",
    category: "phone",
    // MobiFita 800€ -> +50€ = 850€
    price: 850,
    images: [
      foto31
    ],
    brand: "Apple",
    sku: "100012",
    rating: 5,
    specs: {
      "Display diagonal": "6.1” Super Retina XDR",
      "Display resolution": "2556 x 1179 px",
      "Processor family": "Apple A17 Pro",
      "Internal storage capacity": "128 GB",
      RAM: "8 GB",
      "Rear camera resolution": "48 MP + 12 MP + 12 MP",
      "Front camera": "12 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "iOS 17",
      Battery: "3274 mAh",
      "Product colour": "Titanium",
      Weight: "187 g",
      Warranty: "12 muaj",
    },
  },
  {
    id: "samsung-galaxy-s23-fe",
    name: "Samsung Galaxy S23 FE",
    description: "6.4” FHD+, 8GB RAM, 128GB, 50MP kamera.",
    category: "phone",
    // Gjirafa50 rreth 649.50€
    price: 649,
    images: [
      "https://adminapi.applegadgetsbd.com/storage/media/large/Cream-4265.jpg"
      
    ],
    brand: "Samsung",
    sku: "100013",
    rating: 4,
    specs: {
      "Display diagonal": "6.4” FHD+",
      "Display resolution": "2340 x 1080 px",
      "Processor family": "Exynos 2200",
      "Internal storage capacity": "128 GB",
      RAM: "8 GB",
      "Rear camera resolution": "50 MP + 8 MP + 12 MP",
      "Front camera": "10 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "Android 13",
      Battery: "4500 mAh",
      "Product colour": "Cream",
      Weight: "209 g",
      Warranty: "12 muaj",
    },
  },
  {
    id: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    description: "GPS 45mm, Midnight Aluminium Case with Sport Band.",
    category: "phone",
    // Gjirafa/GjirafaMall 527.50€
    price: 527.5,
    images: [
      "https://snapcraze.co.za/wp-content/uploads/2023/11/series-9-45mm-black.jpeg"
      
    ],
    brand: "Apple",
    sku: "100014",
    rating: 5,
    specs: {
      Model: "Series 9",
      Diameter: "45mm",
      Colour: "Midnight",
      Material: "Alumini",
      Type: "GPS",
      Compatibility: "iOS",
      Warranty: "12 muaj",
    },
  },
  {
    id: "airpods-pro-2nd-gen",
    name: "AirPods Pro (2nd Gen)",
    description: "Apple AirPods Pro me ANC, MagSafe Case.",
    category: "case",
    // Neptun KS ~339€
    price: 339,
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1660803972361"
      
    ],
    brand: "Apple",
    sku: "100015",
    rating: 5,
    specs: {
      Type: "True Wireless",
      ANC: "Po",
      "Charging Case": "MagSafe",
      Compatibility: "iOS, Android",
      "Battery life": "6 orë + 24 orë me kuti",
      Warranty: "12 muaj",
    },
  },
  {
    id: "samsung-galaxy-buds2-pro",
    name: "Samsung Galaxy Buds2 Pro",
    description: "Wireless, ANC, 5-18h battery life, Bluetooth 5.3.",
    category: "case",
    // MobiFita rreth 135€
    price: 135,
    images: ["https://www.recellexchange.com/cdn/shop/files/3_214d8a6a-d399-4125-8d18-5a38e6ff8281.png?v=1689105780"],
    brand: "Samsung",
    sku: "100016",
    rating: 4,
    specs: {
      Type: "Wireless",
      ANC: "Po",
      Battery: "5-18 orë",
      Bluetooth: "5.3",
      Warranty: "12 muaj",
    },
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    description: "128GB, 6.1” Super Retina XDR, 12MP kamera.",
    category: "phone",
    // MobiFita LikeNew 289€ -> +50€ = 339€
    price: 339,
    images: [
      foto8
    ],
    brand: "Apple",
    sku: "100017",
    rating: 5,
    specs: {
      "Display diagonal": "6.1” Super Retina XDR",
      "Display resolution": "2532 x 1170 px",
      "Processor family": "Apple A15 Bionic",
      "Internal storage capacity": "128 GB",
      RAM: "4 GB",
      "Rear camera resolution": "12 MP + 12 MP",
      "Front camera": "12 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "iOS 15",
      Battery: "3240 mAh",
      "Product colour": "Blue",
      Weight: "173 g",
      Warranty: "12 muaj",
    },
  },
  {
    id: "samsung-galaxy-m34-5g",
    name: "Samsung Galaxy M34 5G",
    description: "6.5” Super AMOLED, 8GB RAM, 6000mAh bateri.",
    category: "phone",
    // Çmim tregu lokal tipik 279–299€; vendosur 299€
    price: 299,
    oldPrice: 349,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr-kY1S5Lsht5gALPUicmv2CQfK5BFdSHliw&s"
      
    ],
    brand: "Samsung",
    sku: "100018",
    rating: 4,
    specs: {
      "Display diagonal": "6.5” Super AMOLED",
      "Display resolution": "2340 x 1080 px",
      "Processor family": "Exynos 1280",
      "Internal storage capacity": "128 GB",
      RAM: "8 GB",
      "Rear camera resolution": "50 MP + 8 MP + 2 MP",
      "Front camera": "13 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "Android 13",
      Battery: "6000 mAh",
      "Product colour": "Blue",
      Weight: "208 g",
      Warranty: "12 muaj",
    },
  },
  {
    id: "gift-card-75",
    name: "Gift Card 75€",
    description: "Dhuratë ideale për çdo rast.",
    category: "giftcard",
    price: 75,
    images: [fotet],
    brand: "TopMobile",
    sku: "100019",
    rating: 0,
    specs: {
      Vlera: "75€",
      Lloji: "Gift Card fizike",
      "Përdorim": "Në të gjitha produktet",
      Afat: "Pa afat skadimi",
    },
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    description: "6.7” Super Retina XDR, 128GB, Dynamic Island.",
    category: "phone",
    // bazuar në tendencat e tregut lokal (~849–949€ sipas stokut) – ruajtur si më parë
    price: 1149,
    oldPrice: 1249,
    images: [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg"
      
    ],
    brand: "Apple",
    sku: "100020",
    rating: 5,
    specs: {
      "Display diagonal": "6.7” Super Retina XDR",
      "Display resolution": "2796 x 1290 px",
      "Processor family": "Apple A16 Bionic",
      "Internal storage capacity": "128 GB",
      RAM: "6 GB",
      "Rear camera resolution": "48 MP + 12 MP",
      "Front camera": "12 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "iOS 17",
      Battery: "4383 mAh",
      "Product colour": "Blue",
      Weight: "201 g",
      Warranty: "12 muaj",
      Feature: "Dynamic Island",
    },
  },
  {
    id: "samsung-galaxy-s22",
    name: "Samsung Galaxy S22",
    description: "6.1” FHD+, 8GB RAM, Snapdragon 8 Gen 1.",
    category: "phone",
    // Aztechonline ~699€
    price: 699,
    oldPrice: 700,
    images: [
      "https://gsm-sjop.nl/wp-content/uploads/2023/09/s22-white-1.jpeg"
     
    ],
    brand: "Samsung",
    sku: "100021",
    rating: 5,
    specs: {
      "Display diagonal": "6.1” FHD+",
      "Display resolution": "2340 x 1080 px",
      "Processor family": "Snapdragon 8 Gen 1",
      "Internal storage capacity": "128 GB",
      RAM: "8 GB",
      "Rear camera resolution": "50 MP + 10 MP + 12 MP",
      "Front camera": "10 MP",
      "SIM card capability": "Dual SIM",
      "Operating system": "Android 12",
      Battery: "3700 mAh",
      "Product colour": "White",
      Weight: "167 g",
      Warranty: "12 muaj",
    },
  },
  {
    id: "otterbox-defender-iphone-14",
    name: "OtterBox Defender for iPhone 14",
    description: "Mbrojtëse heavy-duty për iPhone 14, black.",
    category: "case",
    // Çmim global ~79€ (varion sipas stokut lokal)
    price: 79,
    oldPrice: 85,
    images: ["https://www.caserace.net/cdn/shop/products/14PlusGrayBlue_2_-1.jpg?v=1669972725"],
    brand: "OtterBox",
    sku: "100022",
    rating: 5,
    specs: {
      Type: "Heavy-duty",
      Compatibility: "iPhone 14",
      Colour: "Black",
      Warranty: "12 muaj",
    },
  },
  {
    id: "wireless-charging-pad",
    name: "Wireless Charging Pad",
    description:
      "Karikues wireless i shpejtë me dizajn të hollë, kompatibil me çdo pajisje Qi.",
    category: "accessory",
    // UGREEN EU ~20–26€ – vendosur 26€
    price: 26,
    oldPrice: 39,
    images: [
      "https://cdn11.bigcommerce.com/s-sp9oc95xrw/images/stencil/1280x1280/products/17355/68417/15w-fast-wireless-charging-pad-ugreen-cd186-15112-__3_-removebg-preview__36857.1698333501.png?c=2",
    ],
    brand: "UGreen",
    sku: "100023",
    rating: 5,
    specs: {
      Type: "Wireless Qi",
      Power: "15W",
      Material: "Alumini",
      Compatibility: "Universal Qi",
      Warranty: "12 muaj",
    },
  },
  {
    id: "smartwatch-strap-leather",
    name: "Smartwatch Leather Strap",
    description:
      "Mbajtëse lëkure premium për smartwatch, ngjyrë kafe e errët.",
    category: "accessory",
    // Çmim i zakonshëm në tregun lokal për rripa lëkure
    price: 29,
    oldPrice: 39,
    images: [
      "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/m/l/ml7l3_av1-removebg-preview.png",
    ],
    brand: "TopMobile",
    sku: "100024",
    rating: 5,
    specs: {
      Material: "Lëkurë natyrale",
      Compatibility: "Smartwatch universal",
      Colour: "Kafe e errët",
      Warranty: "6 muaj",
    },
  },
];

export default demoProducts;
