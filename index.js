const express=require('express')
const cors=require('cors')

const mongoose=require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT ||8000
const URI=process.env.URI

const app=express()
app.use(express.json())
app.use(cors())


const userSchema=mongoose.Schema({
    item_name:String,
    item_quantity:String
})
const Items=mongoose.model("inventories",userSchema)

app.get("/get",(req,res)=>{
    Items.find().then(user=>{
        res.json(user)
    })
})

app.post("/post",(req,res)=>{
   
    Items.create(req.body)
})
app.delete("/delete/:id",(req,res)=>{
   const id=req.params.id
   console.log(id)
    Items.findByIdAndDelete({_id:id}).then(
        console.log("deleted")
    )
})

app.put("/put/:id",(req,res)=>{
    const id=req.params.id
    const quantity=req.body.item_quantity
    console.log(quantity)
    Items.findByIdAndUpdate({_id:id},{item_quantity:quantity}).then(
        console.log("successfull")
    )
})


mongoose.connect(URI).then(
    console.log("Database Connected")
)

app.listen(PORT,(err)=>{
    console.log(`running on the port ${PORT}`)
})
