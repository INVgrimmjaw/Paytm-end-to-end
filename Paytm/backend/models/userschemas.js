const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  { timestamps: true }
);

const accountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      default: 1000,
      min: 0
    }
  },
  { timestamps: true }
);

const transactionSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "success"
    }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
transactionSchema.index({ sender: 1, receiver: 1 });

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { User, Account, Transaction };