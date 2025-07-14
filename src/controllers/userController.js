import User from "../schema/UserSchema.js";

export let registerUser = async (req, res) => {
    try {
        let { username, password, email, contactNumber } = req.body;

        let user = new User({ username, password, email, contactNumber });

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