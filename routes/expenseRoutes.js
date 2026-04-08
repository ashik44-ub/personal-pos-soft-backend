const express = require('express');
const router = express.Router();
const { getExpenses, addExpense, updateExpense, deleteExpense, getTotalExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/total').get(protect, getTotalExpense);
router.route('/').get(protect, getExpenses).post(protect, addExpense);
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
