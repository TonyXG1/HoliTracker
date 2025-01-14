import express from "express";
import ejs from "ejs";
import morgan from "morgan";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (res, req) => {
    req.render("index.ejs");
}); 

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});