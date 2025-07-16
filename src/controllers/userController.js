import User from "../schema/UserSchema.js";
import Product from "../schema/productSchema.js";

export let registerUser = async (req, res) => {
    try {
        console.log("Request: ", req);
        // getting all the information from the client
        let { username, password, email, contactNumber } = req.body;
        // Creating the new user in the db( inserting a new row in the User table)
        let user = await User.create(
            {
                contactNumber: contactNumber,
                username: username,
                password: password,
                email: email
            }
        )
        
        return res.status(201).json({
            success: true,
            user: user
        })
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}   

export let loginUser = async (req, res) => {
    // getting the information from the client
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password both are required .... "
            })
        }
        // get the information of uer from the db
        let user = await User.findOne({ email });
        // Check passwords 
        if (user.password !== password) {
            return res.json({
                success: false,
                message: "Email or password is incorrect..."
            })
        }
        return res.json({
            success: true,
            message: "Logged in Succesfully .... "
        })  
    } catch (error) {
        console.log("error: ", error)
        return res.json({
            success: false,
            message: "Internal server error"
        })
    }
}   


export let addToCart = async (req, res) => {
    try {
        // I need to get all the information from the client
        console.log("req: ", req);
        let { productId, quantity, userId } = req.body; 
        if (!productId || !quantity || !userId) {
            return res.status(400).json({
                success: false,
                message: "Product id, quantity and user id are required"
            })
        }
        // get the user from the db
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        let product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }

        // we need to check the quantity of the product with client sent information
        if (product.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: "Product quantity is not enough"
            })
        }

        // add the product to the cart
        user.cart.push({ productId, quantity });
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully"
        })

    } catch (err) {
        console.log("err while adding to cart ... ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export let getAllCartProducts = async (req, res) => {
    try {
        let { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required ... "
            })
        }
        // check whether the user is present in the db or not 
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found in the DB..."
            })
        }
        return res.status(200).json({
            success: true,
            products: user.cart
        })
    } catch (error) {
        console.log("err while reading products from cart ... ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const deleteProductFromCart = async (req,res) => {
    try {
        let { userId, productId } = req.params;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        let product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }
        // delete the product from the cart 
        let cart = user.cart
        let updatedCart = []
        for (let i = 0; i < cart.length; i++) {
            if (productId === cart[i].productId) {
                continue
            }
            updatedCart.push(cart[i])
        }    
        user.cart = updatedCart;
        await user.save()
    
    } catch (error) {
        console.log("error while deleting product from cart ... ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}