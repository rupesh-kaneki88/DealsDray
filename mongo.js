const mongoose=require("mongoose")
const dotenv = require('dotenv');
dotenv.config();

const mongouser = process.env.mongoUser
const mongopass = process.env.mongoPass


mongoose.connect(`mongodb+srv://${mongouser}:${mongopass}@cluster0.r8jr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:"dealsdray",
})
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})
