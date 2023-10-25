const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const createApp = require('./swagger');
require('dotenv').config();

// Create the Express app
const app = express();
mongoose.set('strictQuery', true);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Define allowed origins
const allowedOrigins = ["http://localhost:3000", "https://colony.app", "http://127.0.0.1:3000", "http://localhost:5000/api-docs"];

// Enable CORS for specified origins and credentials
app.use(
    cors({
        origin: function (origin, callback) {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        exposedHeaders: ['X-Total-Count'],
    })
);




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Swagger documentation setup (moved here)
const swaggerApp = createApp();
app.use(swaggerApp);

// Routes
const userRoute = require('./routes/userRoute');
const houseRoutes = require('./routes/houseRoute');
const maintenance = require('./routes/maintenanceRequestsRoute');
const noticeRoutes = require('./routes/noticeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const societyMember = require('./routes/societyMemberRoutes');

app.use('/app/users', userRoute);
app.use('/app', houseRoutes);
app.use('/app', maintenance);
app.use('/app', noticeRoutes);
app.use('/app', eventRoutes);
app.use('/app', societyMember);

// Error handling middleware should be placed after your routes
const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);

// Home route
app.get('/', (req, res) => {
    res.send('Home Page');
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is operating on port ${PORT}. Check any requests on this  http://localhost:${PORT}/app`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
