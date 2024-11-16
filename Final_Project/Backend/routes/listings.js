const express = require('express');
const router = express.Router();
const listings = require('../data/listings.json');

router.get('/', (req, res) => {
  res.json(listings);
});
router.get("/:id", async(req,res)=>{
})
module.exports = router;
