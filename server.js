const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://personal-store-lime.vercel.app', 'https://personal-store-lime.vercel.app'],
    credentials: true
}));
app.use(express.json());

// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/passwords', passwordRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pos-system')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
