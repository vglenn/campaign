const express = require("express");

const runCampaignCntrl = require("../controllers/runcampaign");
const listCampaignCntrl = require("../controllers/listcampaign");

const router = express.Router();

router.get("/runCampaign", runCampaignCntrl.runCampaign);
router.get("/listCampaignRecipients", listCampaignCntrl.listCampaignRecipients);

module.exports = router;
