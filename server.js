require('dotenv').config();

const connectDB = require('./db');
connectDB();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes'); 
const loginRouter = require('./routes/loginRoute'); 

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes (use imported user routes)
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRouter); 

const port = process.env.PORT || 3000; // Use environment variable or default

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});