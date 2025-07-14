import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { connectToDatabase } from "./config/database.js";
let app = express();
connectToDatabase();

app.use(express.json());

app.use("/user", userRoutes);

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

