import express from "express";
let app = express();
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

