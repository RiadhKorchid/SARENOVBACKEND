import express from "express"
import mongoose from "mongoose"
const serviceSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String
    },
    time:
    {
        type: String
    },
    price:
    {
        type: Number
    },
    image:{
        type:String
    }

}) 
export default mongoose.model("service",serviceSchema)