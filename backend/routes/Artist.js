const router = require('express').Router();
let ArtistModel = require('../model/Artist.model');
const Artist = ArtistModel.Artist;

router.route('/').get((req, res) => {
  Artist.find()
    .then(Artist => res.json(Artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const ArtistID = req.body.ArtistID;
  const Name = req.body.Name;

  const newArtist = new Artist({ArtistID, Name});

  newArtist.save()
    .then(() => res.json('Artist added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
