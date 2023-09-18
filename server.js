const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.set('strictQuery', false);

const app = express();
const userRoute = require('./routes/userRoute');
const houseRoutes = require('./routes/houseRoute');
const maintenance = require('./routes/maintenanceRequestsRoute');
const noticeRoutes = require('./routes/noticeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const societyMember = require('./routes/societyMemberRoutes');

// Set up your routes and middleware here
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for specified origins and credentials
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://colony.app'],
        credentials: true,
    })
);

app.use(express.json());

// Routes
app.use('/app/users', userRoute);
app.use('/app', houseRoutes);
app.use('/app', maintenance);
app.use('/app', noticeRoutes)
app.use('/app', eventRoutes)
app.use('/app', societyMember)

// Error middleware should be placed after your routes
const errorHandler = require('./middleware/errorMiddleware')
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Home Page');
});

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
