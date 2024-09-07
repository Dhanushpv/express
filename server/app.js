const express =require('express');
const app= express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('../client'));
app.use(express.json());

async function mongoConnect(){
    try {
        await mongoose.connect(process.env.MONGOD_URI);
        console.log("Database connection established...")
    } catch (error) {
        console.log("Dtabase connection error :",error);
        
    }

}
mongoConnect()
app.post('/submit',(req,res)=>{
    let body =req.body;
    console.log("body",body);
})
// const Data = mongoose.model('Data', dataSchema);
// app.get('/submit', async (req,res)=>{
//     let body ='';
//     console.log("bodyGET",body);
//     const newData = new Data({
//         name: body.name,
//         // age: body.age,
//         email: body.email
//       });
  
//       // Save the document to MongoDB
//       await newData.save();
  
//       res.status(201).send('Data saved successfully');
// });


let users = new mongoose.Schema({
    name : String,
    email : String,
})
app.listen(process.env.PORT,()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);

});



