const express = require("express")
const router = express.Router();
const Apartment = require( "../model/apartmentModel");

router.get('/apartments', async (req, res) => {
    try {
        const apartments = await Apartment.find();
        return res.status(200).send(apartments);
    } catch (error) {
      return  res.status(404).json({message: "Apartments not found"})
    }

});

router.post('/apartments', async (req, res) => {
    try {
        const {name, location,rooms} = req.body;

        const apartments = await Apartment.find();

        if(!name || !location || !rooms){
          return res.status(400).json({message: "All fields are required"})
        }
        const apartmentName = apartments.map(apartment => apartment.name);
        if(apartmentName.includes(name)){
            return res.status(400).json({message: "Apartment name already exist"})
        }

        const post = new Apartment({
            name,
            location,
            rooms,
            full:false
        });
        await post.save();
        return res.status(201).send(post);
        
    } catch (error) {
        return res.status(500).json({message: "unable to create an apartment"})
    }

});

router.get('/apartments/:id', async(req, res) => {

    try {
        const id = req.params.id;
        const apartment = await Apartment.findOne({_id: id});
        return res.status(200).send(apartment);
        
    } catch (error) {
       return  res.status(404).json({message: "Apartment doesn't exist"})
    }

})

router.patch('/apartments/:id', async (req, res) => {

    try {
        const id = req.params.id
        const oldApartment = await Apartment.findOne({_id: id});
        const {  name, location,rooms} = req.body
        if(name){
            oldApartment.name = name
        }

        if(location){
            oldApartment.location = location
        }

        if(rooms){
            oldApartment.rooms = rooms
        }
        await oldApartment.save();
       return res.status(200).send(oldApartment);

    } catch(error){
        return res.status(404).send({ error: "Apartment doesn't exist" });
    }

})

router.delete("/apartments/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const apartment = await Apartment.deleteOne({_id: id});
    return res.status(200).json({message: `Apartment with id ${id} deleted successfully`})
  } catch (error) {
   return res.status(404).send({ error: "Apartment doesn't exist" });
  }
})



module.exports = router;