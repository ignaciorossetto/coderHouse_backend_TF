import mongoose from "mongoose";

// Collection name
const cartsCollection = "carts";

// Schema definition

const productCartSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    cellphone: {
      type: String,
      default: ''
    },
  },
  paymentInfo: {
    method: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
  },
  shopCart: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
      },
    ],
    _id: false,
  }
},
{
  timestamps:true
});

cartSchema.pre('findOne', function() {
  this.populate('shopCart.product')
})

// Model creation. Collection + Schema
export const cartModel = mongoose.model(cartsCollection, cartSchema);
