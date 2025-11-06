const express = require('express');
const router = express.Router();
const {
  createDeal,
  getDeals,
  updateDeal,
  deleteDeal
} = require('../controllers/dealController');

router.post('/', createDeal);
router.get('/', getDeals);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

module.exports = router;
