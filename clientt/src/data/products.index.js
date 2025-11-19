import demoProducts from "./demoProducts";
import FUJIFILM_PRODUCTS from "./products.fujifilm";
import iphoneProducts from "./productsiphone";
import samsungProducts from "./samsungproducts";
import accessoriesproducts from "./accesoriesproducts";

// Bashko të gjitha në një listë dhe hiq dublikatat sipas id-së
const merged = [
  ...demoProducts,
  ...FUJIFILM_PRODUCTS,
  ...iphoneProducts,
  ...samsungProducts,
  ...accessoriesproducts,
];

const ALL_PRODUCTS = Array.from(
  new Map(merged.map((p) => [p.id, p])).values()
);

export default ALL_PRODUCTS;
