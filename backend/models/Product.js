import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    NumriSerik: String,
    ArtikulliId: Number,
    Pershkrimi: String,
    PershkrimiBrendit: String,
    Kategoria: String,
    KategoriaId: Number,
    Ngjyra: String,
    KodiNgjyres: String,
    Gender: String,
    GenderId: Number,
    Size: String,
    PershkrimiShtes: String,
    ShifraProdhuesit: String,
}, { collection: 'products'});

export const Product = mongoose.model('Product', productSchema);