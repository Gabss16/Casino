// Array de métodos ( C R U D)
const costumersController = {};
 

import costumersModel from "../models/Costumer.js"
 
//SELECT
costumersController.getCostumers = async (req, res) => {
const costumers = await costumersModel.find()
res.json(costumers)
}
 

 
    //DELETE
    costumersController.deleteCostumers = async (req, res) => {
    await costumersModel.findById(req.params.id)
    res.json({message:"costumer deleted"})
}
 
//UPDATE
costumersController.updateCostumers = async (req, res) => {
   //  Solicito todos los valores
    const {name, email, password, age, country} = req.body;
 
    await costumersModel.findByIdAndUpdate(req.params.id,{
       name,
       email,
       password,
       age,
       country
    },{new: true}
);
// muestro un mensaje que todo se actulizó
res.json({ message: "costumer uptated"});
};

export default costumersController;