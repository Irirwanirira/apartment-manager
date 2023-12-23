const  apartment_model = require( "../model/apartmentModel");

function create_apartment(req, res){
    const {  name, location,rooms,full} = req.body
    const newApp = apartment_model.create({
        name,
        location,
        rooms,
        full:false
    })
    if(newApp){
        res.status(200).json({newApp})
    }
    res.send({message: "unable to create an apartment"})

}

module.exports = {create_apartment}