import mongoose from "mongoose"

let productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        required: true
    }
});

let Product = new mongoose.model("Product", productSchema);

export default Product