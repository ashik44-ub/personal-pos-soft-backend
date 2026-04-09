const Password = require('../models/Password');

exports.getPasswords = async (req, res) => {
    try {
        const passwords = await Password.find({ user: req.user.id }).sort({ _id: -1 });
        res.status(200).json(passwords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addPassword = async (req, res) => {
    try {
        const { websiteName, emailAddress, password } = req.body;
        if (!websiteName || !emailAddress || !password) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const newPassword = await Password.create({
            websiteName, emailAddress, password, user: req.user.id
        });

        res.status(201).json(newPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const passwordRecord = await Password.findById(req.params.id);
        if (!passwordRecord) return res.status(404).json({ message: 'Password record not found' });
        
        if (passwordRecord.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedPassword = await Password.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePassword = async (req, res) => {
    try {
         const passwordRecord = await Password.findById(req.params.id);
         if (!passwordRecord) return res.status(404).json({ message: 'Password record not found' });

         if (passwordRecord.user.toString() !== req.user.id) {
             return res.status(401).json({ message: 'User not authorized' });
         }

         await passwordRecord.deleteOne();
         res.status(200).json({ id: req.params.id });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};
