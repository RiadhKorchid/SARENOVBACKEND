
import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true
    },
    services: [mongoose.Schema.Types.Mixed],
    clientEmail: { type: String, required:true} , 
    totalPrice:{type:Number},
    date:{type:String}
});

const Order = mongoose.model('Order', orderSchema);

export default Order;