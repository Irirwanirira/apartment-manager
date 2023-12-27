const  mongoose  = require("mongoose");
const supertest = require("supertest");
const setServer = require("../server");
const Apartment = require("../src/model/apartmentModel");
const {response} = require("express");


beforeEach( async()=> {
    await mongoose.connect("mongodb://localhost:27017/apartment")
})

afterEach( async()=> {
    await mongoose.connection.db.dropCollection(()=> {
        mongoose.connection.close()
    })
})

test("GET /APARTMENT", async() => {
    const post = await Apartment.create({
        name: "grazer",
        location: "NY",
        rooms:50,
        full: false
    })
    await supertest(app)
        .get("/api/apartments")
        .expect(200)
        .then((response) => {
            expect(response.body.length).toBeTruthy()
            expect(response.body[0]._id).toBe(post.id)
            expect(response.body[0].name).toBe(post.name)
            expect(response.body[0].location).toBe(post.location)
            expect(response.body[0].rooms).toBe(post.rooms)
            expect(response.body[0].full).toBe(post.full)})        
})