let mailshake = require("mailshake-node")(
  "beb79ed4-85ca-48b8-a1e5-b059c6f9ba2c"
);

const Album = require("../models/album");

exports.runCampaign = (req, res, next) => {
  const year = req.query.year || 1;

  Album.findByYear(year)
    .then(([albums]) => {
      let mappedAddresses = albums.map((person) => ({
        emailAddress:
          Math.random().toString(36).substring(7) + "@mailinator.com",
        fullName: person.album_artist,
        fields: {
          albumname: person.album_title,
          artistname: person.album_artist,
          favorite_color: "Red",
        },
      }));

      mailshake.recipients
        .add({
          campaignID: 75473,
          addAsNewList: true,
          addresses: mappedAddresses,
        })
        .then((result) => {
          res.status(200).json({ payload: result });
        })
        .catch((err) => {
          console.error(`${err.code}: ${err.message}`);
        });
    })
    .catch((err) => console.log(err));
};
