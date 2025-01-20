import express, { response } from "express";
import ejs from "ejs";
import morgan from "morgan";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import translate from "translate";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const API_URL = "https://openholidaysapi.org";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.set("view engine", "ejs");

translate.engine = "google";
translate.key = process.env.GOOGLE_API_KEY;

//The request when the site is opened
app.get("/", async (req, res) => {
    //Gets the current date
    const date = new Date().toISOString().split("T")[0];
    console.log(date);

    try {
        //STATIC for Bulgaria 2024
        const response = await axios.get(API_URL + `/PublicHolidays?countryIsoCode=BG&validFrom=${date}&validTo=${date}`); 
        const data = response.data;

        // check if todays date is a holiday
        if(data.find(item => item.startDate === date) === undefined) {
            res.render("index.ejs", {
                holidayEn: "Today is not a holiday",
                holidayCountry: await translate("Today is not a holiday", { from: "en", to: "bg" })
            });
        } else {
            res.render("index.ejs", {
                holidayEn: data[0].name.find(item => item.language === "EN").text,
                holidayCountry: data[0].name.find(item => item.language === "BG").text
            });
        };

    } catch (error) {
        console.log(error);
    };
}); 

//Request when the user changes the things
app.post("/submit", async (req, res, next) => {
    const country = req.body["country"];
    const date = req.body["date"];
    try {
        const response = await axios.get(API_URL + `/PublicHolidays?countryIsoCode=${country}&validFrom=${date}&validTo=${date}`);
        const data = response.data;
        console.log(API_URL + `/PublicHolidays?countryIsoCode=${country}&validFrom=${date}&validTo=${date}`);
        if(data.find(item => item.startDate === date) === undefined) {
            res.render("index.ejs", {
                holidayEn: "Today is not a holiday",
                holidayCountry: await translate("Today is not a holiday", { from: "en", to: country.toLowerCase() })
            });
        } else{
            res.render("index.ejs", {
                holidayEn: data[0].name.find(item => item.language === "EN").text,
                holidayCountry: data[0].name.find(item => item.language === country).text
            });
        }
    } catch (error) {
        res.render("index.ejs", {
            holidayEn: "Choose country and date",
            holidayCountry: await translate("Choose country and date", { from: "en", to: country.toLowerCase()})
        })
    }
    next();
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});