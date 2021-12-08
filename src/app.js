require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const hbs = require("hbs");

const api_key = process.env.API_KEY;

//public static path
// console.log(path.join(__dirname));
// console.log(path.join(__dirname,"../public"));
const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);
app.set("view engine", "hbs");
app.set("views", template_path);
app.use(express.static(staticPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  res.render("weather", { api_key: api_key });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "ERROR ! 404 ",
  });
});

app.listen(port, () => {
  console.log(`Listening at the port ${port}`);
});
