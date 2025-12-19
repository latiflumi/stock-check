import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  NumriSerik: String,
  ArtikulliId: Number,
  Pershkrimi: String,
  PershkrimiBrendit: String,
  Kategoria: String,
  Ngjyra: String,
  Gender: String,
  Size: String,
  PershkrimiShtes: String,
  ShifraProdhuesit: String
}, { collection: 'products'});

export const Product = mongoose.model('Product', productSchema);