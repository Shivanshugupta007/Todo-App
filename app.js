//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin-shiv:Test123@cluster0.ywjewgz.mongodb.net/todolistDB");

const app = express();

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item ({
  name: "Welcome Here"
});

// item1.save();

const item2 = new Item ({
  name: "Hit The + Button To Add New Item"
});

// item2.save();

const item3 = new Item ({
  name: "<-- Hit This To Delete Items"
});

// item3.save();

const defaultItems = [item1, item2, item3];

// const listSchema = {
//   name: String,
//   items: [itemSchema]
// };

// const List = mongoose.model("List", listSchema);


// const deleteAll = async () => {
//   await Item.deleteMany({name: "Hit The + Button To Add New Item"});
// }

// deleteAll();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// app.get("/", function(req, res) {

//   Item.find({}, function(err, foundItems){                    ///NOT WORKING WITH RES.RENDER....
//     console.log(foundItems);
//     res.render("list", {listTitle: "Today", newListItems: foundItems});
//   });




app.get("/", async (req, res) => {
  try {
    const foundItems = await Item.find({ });
    // console.log(foundItems);
    if (foundItems.length === 0){

      Item.insertMany(defaultItems)
      .then(function () {
        console.log("Successfully saved defult items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });
      res.redirect("/");
    }
    else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  } catch (err) {
    console.log(err);
  }
});



// app.get("/:customListName", function(req, res) {
//   console.log(req.params.customListName);
//   const customListName = req.params.customListName;

  
// });

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const addNew = new Item ({
    name: itemName
  });

  addNew.save();

  res.redirect("/");

});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  console.log(checkedItemId);
      Item.deleteOne({_id: checkedItemId})
      .then(function () {
        console.log("Successfully Deleted");
      })
      .catch(function (err) {
        console.log(err);
      });
  res.redirect("/");
});


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
