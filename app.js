const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
const dbURI =
  "mongodb+srv://MIE:meyangs126@cluster0.slzl1aq.mongodb.net/Express-nodejs-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000);
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog2",
    snippet: "about my new blog",
    body: "the body of my new blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

const blogs = [
  {
    title: "in the dark",
    snippet:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ullam!",
  },
  {
    title: "kissing booth",
    snippet:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ullam!",
  },
  {
    title: "long run of life",
    snippet:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ullam!",
  },
];

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.status(301).redirect("/about");
});
app.use("/blogs", blogRoutes);
app.use((req, res) => {
  res.render("404", { title: "404" });
});
