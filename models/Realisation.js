import mongoose from "mongoose"
const RealisationSchema = mongoose.Schema({
    title :{
        type: String
    },
    description:{
        type:String
    },
    image :{
        type:String
    }
}) 
export default mongoose.model("Realistion",RealisationSchema)
