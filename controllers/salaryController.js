const Salary = require('../models/Salary');

exports.getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find({ user: req.user.id });
        res.status(200).json(salaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addSalary = async (req, res) => {
    try {
        const { amount, description, date } = req.body;
        if (!amount) return res.status(400).json({ message: 'Please add required fields' });

        const newSalary = await Salary.create({
            amount, description, date, user: req.user.id
        });

        res.status(201).json(newSalary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSalary = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id);
        if (!salary) return res.status(404).json({ message: 'Salary not found' });
        
        if (salary.user.toString() !== req.user.id) return res.status(401).json({ message: 'User not authorized' });

        const updatedSalary = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSalary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSalary = async (req, res) => {
    try {
         const salary = await Salary.findById(req.params.id);
         if (!salary) return res.status(404).json({ message: 'Salary not found' });

         if (salary.user.toString() !== req.user.id) return res.status(401).json({ message: 'User not authorized' });

         await salary.deleteOne();
         res.status(200).json({ id: req.params.id });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

exports.getTotalSalary = async (req, res) => {
    try {
        const mongoose = require('mongoose');
        const total = await Salary.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        
        res.status(200).json({ total: total.length > 0 ? total[0].totalAmount : 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
