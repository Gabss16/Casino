import { Schema, model } from "mongoose";


const costumersShema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    age:{
        type: String,
        require: true
    },
    country:{
        type: String,
        require: true
    }
},{
    timestamps: true,
    strict: false
});

export default model( "Costumers", costumersShema)