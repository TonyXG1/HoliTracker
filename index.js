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
const API_URL = "https://openholidaysapi.org";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));



//The request when the site is opened
app.get("/", async (req, res) => {
    //Gets the current date
    const date = new Date().toISOString().split("T")[0];
    console.log(date);


    try {
        //STATIC for Bulgaria 2024
        const response = await axios.get(API_URL + `/PublicHolidays?countryIsoCode=BG&validFrom=2025-01-01&validTo=2025-12-31`); 
        const data = response.data;

        // check if todays date is a holiday
        if(data.find(item => item.startDate === date) === undefined) {
            console.log("No holiday on this date")
        } else data.find(item => item.startDate === date);

        res.render("index.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    };
}); 

//Request when the user changes the things
app.post("/submit", (req, res, next) => {
    const country = req.body["country"];
    console.log(country);

    
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});