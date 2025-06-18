const Products = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      description: "Smartphone Apple, 256GB, 5G",
      category: "phone",
      price: 1099,
      oldPrice: 1199,
      image: require("../assets/freepik__upload__70538-removebg-preview.png"),
      specs: {
        Model: "A2650",
        Color: "Black",
        Connectivity: "5G, Wi-Fi 6"
      }
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      description: "6.8” QHD+, 12GB RAM, 200MP kamera, S-Pen.",
      category: "phone",
      price: 1150,
      oldPrice: 1270,
      image: require("../assets/DSC06547_alt-removebg-preview.png"),
      specs: {
        Model: "SM-S918B/DS",
        Color: "Phantom Black",
        Connectivity: "5G, Wi-Fi 6E"
      }
    },
    {
      id: 3,
      name: "Samsung Galaxy A55 5G",
      description: "6.6” Super AMOLED, 128GB/256GB, 50MP kamera, 5000mAh.",
      category: "phone",
      price: 390,
      oldPrice: 420,
      image: "https://img-resizer.cyberport.de/cp/images/684x684/240402125736400501900002E",
      specs: {
        Model: "SM-A556B",
        Color: "Green",
        Connectivity: "5G"
      }
    },
    {
      id: 4,
      name: "Gift Card 100€",
      description: "Kartë dhurate për çdo rast.",
      category: "giftcard",
      price: 100,
      image: require("../assets/ChatGPT_Image_Jun_16__2025__02_13_41_PM-removebg-preview.png"),
      specs: {
        Validity: "1 year",
        Delivery: "Email"
      }
    },
    {
      id: 5,
      name: "iPhone 15",
      description: "Apple iPhone 15, 128GB, Midnight Black",
      category: "phone",
      price: 1029,
      oldPrice: 1099,
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
      specs: {
        Model: "A3453",
        Color: "Midnight",
        Connectivity: "5G, Nano-SIM"
      }
    }
  ];
  export default Products;