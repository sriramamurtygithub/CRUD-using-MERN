const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors')
const UserModel = require('./models/users')


const app = express();//express setup
app.use(cors());
app.use(express.json());



mongoose.connect("mongodb://localhost:27017/crud ")//mongodb connection

app.post("/CreateUser", (req,res) =>{// From CreateUser to DB
  UserModel.create(req.body)// creates a new user document in the database.
  .then(users => res.json(users))//If UserModel.create(req.body) is successful then, the data(users) is sent to the db in a JSON format
  .catch(err => res.json(err))

})

app.get("/",(req,res)=>{//From DB to Users page
  UserModel.find({})//the empty notation "{}" means it goes through everthing
  .then(users => res.json(users))//If UserModel.find({}) is successful then the data is sent to "/" (table)
  .catch(err => res.json(err))
} )

app.get("/getUser/:id", (req,res) =>{//From Users to DB
  const id = req.params.id;//to get the id of the user that the client wants to edit
  UserModel.findById({_id:id})
  .then(users => res.json(users))
  .catch(err => res.json(err))
} )

app.put("/updateUser/:id", (req,res) =>{
  const id  = req.params.id//to get the id of the user that the client wants to edit
  UserModel.findByIdAndUpdate({_id: id},{//finds the id and updates the data 
    name:req.body.name,
    sid:req.body.sid,
    dept:req.body.dept,
  })
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

app.delete("/deleteUser/:id", (req,res)=>{
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id :id})
  .then(res => res.json(res))
  .catch(err => res.json(err))
})


app.listen(3001, () =>{
  console.log("Server is running");
})