const express = require('express');
const cors = require('cors');
const mongoose = require('./mongo'); 
const User = require('./model/loginModel');
const path = require('path');


const loginRoute = require('./routes/loginRoute')
const EmployeeRoute = require('./routes/EmployeeRoute')

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001

const app = express();
app.use(express.json());
app.use(cors());

app.use("/login",loginRoute );
app.use("/employees",EmployeeRoute)

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
