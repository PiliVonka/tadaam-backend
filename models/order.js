import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const OrderSchema = new Schema({
  contract: {
    type: String,
    required: true
  },
  client: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  worker: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Order = model("Order", OrderSchema);
export default Order;
