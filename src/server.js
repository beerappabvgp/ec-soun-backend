import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { connectToDatabase } from "./config/database.js";
import UserRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
let app = express();



// Middleware
let count = 0
function countRequests(req, res, next) {
    count += 1;
    console.log("The number of request received by server is: ", count);
    next()
}

app.use(countRequests);















app.use(express.json());
connectToDatabase();

app.use("/auth", UserRoutes);
app.use("/products", productRoutes);

function helloWorld(request, response) {
    response.send("Hello World !!!!");
}
function health(req, res) {
    return res.send("Health condition is GOOD");
}
app.get("/hello", helloWorld);
app.get("/health", health);
app.listen(5000);




// type of app 

// console.log("type of app: ", typeof app);


// console.log("app: ", app);



// userId = 68773435a69178d38dd667d9
// productId = 6874b391a2caad24c5e982ee