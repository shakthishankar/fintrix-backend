const express = require('express');
const router = express.Router();
const validate = require("../middleware/validate");
const { createDealSchema } = require("../validations/dealValidation");

const {
  createDeal,
  getDeals,
  updateDeal,
  deleteDeal
} = require('../controllers/dealController');

router.post('/', validate(createDealSchema), createDeal);
router.get('/', getDeals);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

module.exports = router;
