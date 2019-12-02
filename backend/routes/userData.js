const router = require("express").Router();
let UserData = require("../model/userData.model");

router.route("/").get((req, res) => {
  UserData.find()
    .then(userData => res.json(userData))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").post((req, res) => {
  /* newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
*/

  async function createUser() {
    const newUser = new UserData({
      userID: req.body.id,
      name: req.body.name,
      songs: req.body.songs,
      LonLat: req.body.location
    });
    const result = await newUser.save();
    console.log(result);
  }

  if (UserData.findById(req.body.id) !== req.body.id) {
    createUser();
  }
});

module.exports = router;
