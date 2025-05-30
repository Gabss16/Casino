import { Schema, model } from "mongoose";


const gamesShema = new Schema({
    name:{
        type: String,
        require: true
    },
    category:{
        type: String

    },
    max_bet:{
        type: Number

    }, 
    min_bet:{
        type: Number

    },
    img:{
        type: String
    }
},{
    timestamps: true,
    strict: false
});

export default model( "ganes", gamesShema)