import Product from "../schema/productSchema.js";

export let createProduct = async (req, res) => {
    try {
        // Getting all the information from the client
    let { productName, price, description, quantity, brand } = req.body;

    if (!productName || !price || !description || !quantity || !brand) {
        return res.status(400).json({
            success: false,
            "message": "All the fields are required .... "
        })
    }
    // store the product information in DB
    let product = await Product.create({
        productName,
        price,
        description,
        quantity,
        brand
    });
    // send a response back to the
    // client 
    return res.json({
        success: true,
        product: product
    })
    } catch (error) {
        console.log("error in creating the product...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error ... "
        })
    }

}

export let getAllProducts = async (req, res) => {
    try {
        // get all products from the DB
        let products = await Product.find();
        return res.json({
            success: true,
            products: products
        })
    } catch (error) {
        console.log("err: ", error);
        return res.json({
            success: false,
            "message": "internal server error..."
        })
    }
}

export let getProductById = async (req, res) => {
    try {
        // get the id from the url 
        let { id } = req.params;
        // get the product from db
        let product = await Product.findById(id);
        if (!product) {
            return res.json({
                success: false,
                message: "The product does not exist in the database .... "
            })
        }
        return res.status(200).json({
            success: true,
            product: product
        })
    } catch (error) {
        console.log("err: ", error);
        return res.json({
            sucess: false,
            message: "Internal server error"
        })
    }
}

export let updateProductById = async (req, res) => {
    try {
        // get the id from the url
        let { id } = req.params;
        // get the product from the db
        let product = await Product.findById(id);
        if (!product) {
            return res.json({
                sucess: false,
                message: "The product does not exist in the database ...."
            })
        }
        // get the updated information form the client 
        let { productName, price, description, quantity, brand } = req.body;
        // update the product information in the DB
        let updatedProduct = await Product.findByIdAndUpdate(id, {
            productName: productName,
            price: price,
            description: description,
            quantity: quantity,
            brand: brand
        }, { new: true })
        if (!updatedProduct) {
            return res.json({
                success: false,
                message: "The product was not updated ...."
            })
        }
        return res.json({
            success: true,
            product: updatedProduct
        })
    } catch (error) {
        console.log("err while updating the product...", error);
        return res.json({
            success: false,
            message: "Internal server error ... "
        })
    }
}

export let deleteProductById = async (req, res) => {
    try {
        // get the id from the client url 
        let { id } = req.params;
        let product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "The product does not exist in the database ...."
            })
        }
        let deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(400).json({
                success: false,
                message: "The product was not deleted ... "
            })
        }
        return res.status(200).json({
            success: true,
            message: "The product was deleted successfully .... "
        });


    } catch (error) {
        console.log("err while deleting the product...", error);
        return res.json({
            success: false,
            message: "Internal server error ..."
        })
    }
}