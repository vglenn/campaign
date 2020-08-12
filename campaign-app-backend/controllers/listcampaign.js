let mailshake = require("mailshake-node")(
  "beb79ed4-85ca-48b8-a1e5-b059c6f9ba2c"
);

exports.listCampaignRecipients = (req, res, next) => {
  const campaignID = req.query.campaignID || 1;
  const search = req.query.search || 1;

  mailshake.recipients
    .list({
      campaignID: parseInt(campaignID),
      // search: search,
    })
    .then((result) => {
      res.status(200).json({ payload: result.results });
    })
    .catch((err) => {
      console.error(`${err.code}: ${err.message}`);
    });
};
