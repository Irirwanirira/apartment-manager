const  database  = require("mongoose");
const supertest = require("supertest");
const setServer = require("../server");
const Apartment = require("../src/model/apartmentModel");
const {response} = require("express");


beforeEach( async()=> {
    await database.connect("mongodb://localhost:27017/apartment")
2222222