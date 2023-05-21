import mongoose from "mongoose";

// Collection name
const usersCollection = "users";

// Schema definition

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'user'
  },
  strategy: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  documents: {
    dni:  {
      name: {
        type: String,
        default: 'dni'
      },
      reference: [String],
      status: {
        type:String,
        default: 'not upload'
      }
    },
    address: {
      name: {
        type: String,
        default: 'address'
      },
      reference: [String],
      status: {
        type:String,
        default: 'not upload'
      }
    },
    accStatement: {
      name: {
        type: String,
        default: 'accStatement'
      },
      reference: [String],
      status: {
        type:String,
        default: 'not upload'
      }
    },
    },
  carts: {
    type: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "carts",
        },
        confirmed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    _id: false,
  },
});

userSchema.pre("findOne", function () {
  this.populate("carts.cart");
});

// Model creation. Collection + Schema
export const userModel = mongoose.model(usersCollection, userSchema);
