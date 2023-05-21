import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

// Collection name
const productsCollection = "products";

// Schema definition
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    default: 'admin',
    
    required: true,
  },
});

productSchema.plugin(mongoosePaginate)

// Model creation. Collection + Schema
export const productModel = mongoose.model(productsCollection, productSchema);
