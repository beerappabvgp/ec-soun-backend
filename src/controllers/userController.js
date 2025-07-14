import User from "../schema/UserSchema.js";

export let registerUser = async (req, res) => {
    try {
        // getting all the information from the client
        let { username, password, email, contactNumber } = req.body;
        // Creating the new user in the db( inserting a new row in the User table)
        let user = new User({ username, password, email, contactNumber });
        // Saving the user in the database 
        await user.save();
        
        return res.status(201).json({
            success: true,
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
        
    }
}   