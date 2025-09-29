import express, { json } from "express";
import { router } from "./routes/product.routes.js";
const app = express();
app.use(json());

const PORT = 3000;

app.use('/',router);

const greet = () =>{
    console.log("Server started at port -", PORT);
}
app.listen(PORT, greet);

