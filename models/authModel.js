const mongoose = require("mongoose");

// Auth Schema-
const authSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    userName: { 
      type: String, 
      required: true, 
      trim: true, 
      lowercase: true,
      unique: true,
    },
    email: { 
      type: String, 
      unique: true, 
      required: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true, 
      trim: true 
    },
    role: { 
      type: String, 
      default: "user"
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Auth Model-
const AuthModel = mongoose.model("user", authSchema);
module.exports = AuthModel;