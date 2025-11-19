// src/data/demoProducts.js
// Kurorëzim i një liste të shkurtuar (subset) nga iPhone, Samsung dhe Fujifilm
// Qëllimi: të kemi disa produkte shembull për Home/SEO pa importuar krejt datasetet

import iphoneProducts from "./productsiphone";
import samsungProducts from "./samsungproducts";
import FUJIFILM_PRODUCTS from "./products.fujifilm";

// Përdor vetëm produkte që kanë të paktën një imazh për kartat
const hasImage = (p) => Array.isArray(p?.images) && p.images.length > 0 && !!p.images[0];

// Përzgjedhje e vogël – "jo krejt produktet, disa" nga secila kategori
const curatedIphones = iphoneProducts.filter(hasImage).slice(0, 6);
const curatedSamsungs = samsungProducts.filter(hasImage).slice(0, 6);
const curatedFujifilm = FUJIFILM_PRODUCTS.filter(hasImage).slice(0, 6);

const demoProducts = [
  ...curatedIphones,
  ...curatedSamsungs,
  ...curatedFujifilm,
];

export default demoProducts;
