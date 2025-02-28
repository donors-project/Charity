require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); 
const userRoutes = require('./routes/userRoutes');
// const adminRoutes = require('./routes/adminRoutes');


const app = express();
const PORT = process.env.PORT || 5000;


// ------------ Middlewares ------------
app.use(express.json());


app.use('/api/users', userRoutes);
// app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
    res.send('Hello! Your Express server and Sequelize connection are working.');
});


// ------------ Start Server & Database ------------
const startServer = async () => {
    try {
        // Test DB 
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
        
        // Sync DB
        await sequelize.sync({ force: false }); 
        console.log('Database synced');
        
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

startServer();
