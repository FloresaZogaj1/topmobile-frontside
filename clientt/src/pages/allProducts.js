import iphoneProducts from "./ProductsIphone";
import samsungProducts from "./ProductsSamsung";
import accessories from "./ProductsAccessories";

export const allProducts = [
    ...iphoneProducts.map(p => ({ ...p, category: "iphone" })),
    ...samsungProducts.map(p => ({ ...p, category: "samsung" })),
    ...accessories.map(p => ({ ...p, category: "accessory" })),
    // ...shto të tjera
  ];
