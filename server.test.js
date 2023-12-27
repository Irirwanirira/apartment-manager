const  mongoose  = require("mongoose");
const supertest = require("supertest");
const createServer = require("./server");
const Apartment = require("./src/model/apartmentModel");
const { response } = require("express");
const { patch } = require("./src/routes/routes");
const app = createServer();


beforeEach( async()=> {
    await mongoose.connect("mongodb://localhost:27017/apartment")
})

afterEach( async()=> {
    await Apartment.deleteMany();
    await mongoose.connection.close();
})

test("GET /APARTMENTS", async() => {
    const data = await Apartment.create({
        name: "grazer",
        location: "NY",
        rooms:50,
        full: false
    })
    await supertest(app)
        .get("/api/apartments")
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body.length).toBeTruthy()
            expect(response.body[0]._id).toBe(data.id)
            expect(response.body[0].name).toBe(data.name)
            expect(response.body[0].location).toBe(data.location)
            expect(response.body[0].rooms).toBe(data.rooms)
            expect(response.body[0].full).toBe(data.full)
        })
})

test("POST /APARTMENTS", async() => {
    const data = {
        name: "grazer",
        location: "NY",
        rooms:50,
        full: false
    }
    await supertest(app)
        .post("/api/apartments")
        .send(data)
        .expect(201)
        .then(async(response) => {
            expect(response.body._id).toBeTruthy()
            expect(response.body.name).toBe(data.name)
            expect(response.body.location).toBe(data.location)
            expect(response.body.rooms).toBe(data.rooms)
            expect(response.body.full).toBe(data.full)
            const post = await Apartment.findOne({_id: response.body._id})
            expect(post).toBeTruthy()
            expect(post.name).toBe(data.name)
            expect(post.location).toBe(data.location)
            expect(post.rooms).toBe(data.rooms)
            expect(post.full).toBe(data.full)
        })
})

test("GET /APARTMENTS/:ID", async() => {
    const data = await Apartment.create({
        name: "grazer",
        location: "NY",
        rooms:50,
        full: false
    })
    await supertest(app)
        .get(`/api/apartments/${data._id}`)
        .expect(200)
        .then((response) => {
            expect(response.body._id).toBe(data.id)
            expect(response.body.name).toBe(data.name)
            expect(response.body.location).toBe(data.location)
            expect(response.body.rooms).toBe(data.rooms)
            expect(response.body.full).toBe(data.full)
        })
})

test("PUT /APARTMENTS/:ID", async() => {
    const data = await Apartment.create({
        name: "grazer",
        location: "NY",
        rooms:50,
        full: false
    })
    const update = {
        full: true
    }
    await supertest(app)
        .put(`/api/apartments/${data._id}`)
        .send(update)
        .expect(200)
        .then(async(response) => {
            expect(response.body._id).toBe(data.id)
            expect(response.body.full).toBe(update.full)
            const post = await Apartment.findOne({_id: response.body._id})
            expect(post).toBeTruthy()
            expect(post.full).toBe(update.full)
        })
})

test("PATCH /APARTMENTS/:ID", async() => {
    const data = await Apartment.create({
        name: "grazer",
        location: "NY",
        rooms:50,
        full: false
    })
    const update = {
        name: "Genesis",
        location: "G city",
        rooms: 100,
        full: true
    }
    await supertest(app)
        .patch(`/api/apartments/${data._id}`)
        .send(update)
        .expect(200)
        .then(async(response) => {
            expect(response.body._id).toBe(data.id)
            expect(response.body.name).toBe(update.name)
            expect(response.body.location).toBe(update.location)
            expect(response.body.rooms).toBe(update.rooms)
            expect(response.body.full).toBe(update.full)
            const post = await Apartment.findOne({_id: response.body._id})
            expect(post).toBeTruthy()
            expect(post.name).toBe(update.name)
            expect(post.location).toBe(update.location)
            expect(post.rooms).toBe(update.rooms)
            expect(post.full).toBe(update.full)
        })
})

test("DELETE /APARTMENTS/:ID", async() => {
    const data = await Apartment.create({
        name: "grazer",
        location: "NY",
        rooms:50,
        full: false
    })
    await supertest(app)
        .delete("/api/apartments/" + data.id)
        .expect(200)
        .then(async(response) => {
            let id = response.body._id
            const post = await Apartment.findOne({_id: id})
            expect(post).toBeFalsy()
        })
})