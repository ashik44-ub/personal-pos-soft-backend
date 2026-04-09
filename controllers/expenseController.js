const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).populate('category').sort({ _id: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const { amount, description, category, date } = req.body;
        if (!amount || !category) return res.status(400).json({ message: 'Please add required fields' });

        const expense = await Expense.create({
            amount, description, category, date, user: req.user.id
        });

        const newExpense = await Expense.findById(expense._id).populate('category');
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        
        if (expense.user.toString() !== req.user.id) return res.status(401).json({ message: 'User not authorized' });

        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category');
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
         const expense = await Expense.findById(req.params.id);
         if (!expense) return res.status(404).json({ message: 'Expense not found' });

         if (expense.user.toString() !== req.user.id) return res.status(401).json({ message: 'User not authorized' });

         await expense.deleteOne();
         res.status(200).json({ id: req.params.id });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

exports.getTotalExpense = async (req, res) => {
    try {
        const mongoose = require('mongoose');
        const total = await Expense.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        
        res.status(200).json({ total: total.length > 0 ? total[0].totalAmount : 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
