const router = require('express').Router();
let Artist = require('../model/Artist.model');

router.route('/').get((req, res) => {
  Artist.find()
    .then(Artist => res.json(Artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const ArtistID = req.body.ArtistID;

  const newArtist = new Artist({ArtistID});

  newArtist.save()
    .then(() => res.json('Artist added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
