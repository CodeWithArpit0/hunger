import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true,
        maxlength: 200
    },
    customer_phone: {
        type: String,
        required: true,
        maxlength: 13
    },
    customer_address: {
        type: String,
        maxlength: 200, 
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0,
    },
    method: {
        type: Number,
        required: true
    },
}, { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);