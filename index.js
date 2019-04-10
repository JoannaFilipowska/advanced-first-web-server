const express = require("express");
const state = require("./state.js");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
app.use(bodyParser.json());

app.get("/users", function(req, res) {
  res.send(state.users);
});
app.get("/users/1", function(req, res) {
  res.send(state.users[0]);
});
//app.post("/users", (req, res) => {
//state.users.push({
//_id: 6,
//name: "Birt",
//occupation: "adventurer1313",
//avatar:
//"http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg"
//});
//res.send(state.users[state.users.length - 1]);
//});

app.put("/users/1", (req, res) => {
  state.users[0]["occupation"] = "President ";
  res.send(state.users[0]);
});

app.delete("/users/1", (req, res) => {
  state.users.shift();
  res.send("deleted");
});

app.post("/users", (req, res) => {
  req.body.forEach((user, index) => {
    user.id = index;
  });

  state.users = state.users.concat(req.body);
  res.json(state.users);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.put("/users/userId", (req, res) => {
  let useId = req.paramas.userId;
  let userIndex = state.users.find(u => u._id == useId);
  let newUser = Object.assign({}, state.users[userIndex], req.body);
  state.users[userIndex] = newUser;

  //let user = {
  //id:req.body.id,
  //name: req.body.name,
  //occupation: req.body.occupation,
  //avatar:req.body.avatar
  //};
  res.send(state.users[userIndex]);
});
