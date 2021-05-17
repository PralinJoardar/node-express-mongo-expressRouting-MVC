const { render } = require("ejs");
const express = require("express");
require("dotenv").config();
const blogRoutes = require("./routes/blogRoutes");

//mongoose
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

//database uri details (connect to mongoDB)
const dbURI = process.env.dbURI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  //second parameter passed to avoid any depreciation warning
  .then((result) => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log("server is running on", PORT);
    });
  })
  .catch((err) => console.log(err));

// static middleware for public files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// to get the form data from ejs file

//blog Routes
app.use("/blogs", blogRoutes);

//other Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
