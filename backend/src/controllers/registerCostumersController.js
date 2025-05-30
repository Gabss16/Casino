
 

import customersModel from "../models/Costumer.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"


import {config} from "../config.js"

const registerCustomersController = {};
registerCustomersController.register = async (req, res) => {
    const{name, 
        email, 
        password, 
        age, 
        country
    } = req.body;
    try{

        const existCustumer = await customersModel.findOne({email})
        if(existCustumer){
            return  res.json({message: "Custumer already exist"})
        }
        //encriptar contraseña
        const passwordHash = await bcryptjs.hash(password, 10)
        //guardar todo
        const newCustumer = new customersModel ({name,
             email, 
             password:passwordHash, 
             age, 
             country});
        await newCustumer.save()
        

        //token
        jsonwebtoken.sign(
    { id: newCustumer._id },
    config.JWT.secret,
    { expiresIn: config.JWT.expiresIn },
    (error, token) => {
        if (error) {
            console.log("error " + error);
            return res.status(500).json({ message: "Error generando token" });
        }

        res.cookie("authToken", token);
        return res.json({ message: "cliente guardado" });
    }
);

        
        


    } catch (error) {
        res.json({message: "error"+error})
        res.json({message: "Error saving employee"})

    }
 }
export default registerCustomersController;