const router = require('express').Router();
let UserData = require('../model/userData.model');

router.route('/').get((req, res) => {
  UserData.find()
    .then(userData => res.json(userData))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const id = req.body.id;

  const newUser = new UserData({id});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
