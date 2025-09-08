const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    restaurant_Id: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant", required: true },
     foodItems: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "foods",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
      },
      { _id:false}
    ],
    deliveryAgent_id: String,
    status: {
      type: String,
      enum: ["confirmed", "preparing", "on-the-way", "delivered", "cancelled"],
      default: "pending",
    },
    amountToPay: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const orderModel = mongoose.models.orders || mongoose.model('orders', orderSchema);