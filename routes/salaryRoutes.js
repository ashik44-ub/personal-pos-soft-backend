const express = require('express');
const router = express.Router();
const { getSalaries, addSalary, updateSalary, deleteSalary, getTotalSalary } = require('../controllers/salaryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/total').get(protect, getTotalSalary);
router.route('/').get(protect, getSalaries).post(protect, addSalary);
router.route('/:id').put(protect, updateSalary).delete(protect, deleteSalary);

module.exports = router;
