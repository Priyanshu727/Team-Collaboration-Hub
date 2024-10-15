const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const taskRoutes = require('../routes/taskRoutes');
const chatRoutes = require('../routes/chatRoutes');


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
    res.send("Hello, World!!!!");
});

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', chatRoutes);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err, 'Server failed to start');
    } else {
        console.log(`Listening on port: http://localhost:${PORT}`);
    }
});