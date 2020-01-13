// import express from "express" // ES2015 module syntax

const express = require("express"); // CommonJS modules

const Hubs = require("./data/hubs-model.js"); // our Hubs database library

const server = express();

// middleware: teaches express new things
server.use(express.json()); // needed to parse JSON 

// Routes or Endpoints 

// GET to "/"
server.get("/", function(request, response) {
    response.send({hello: "Web 25!"});
})

// see a list of Hubs
server.get("/api/hubs", (req, res) => {
    // read the data from the database (Hubs)
    Hubs.find() // returns a promise
    .then(hubs => {
        res
            .status(200)
            .json(hubs)
    })
    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({ 
                errorMessage: "Sorry, we ran into an error getting the list of Hubs."
            });
    })
})

// create a Hub
server.post("/api/hubs", (req, res) => {
    const hubData = req.body; // for this to work, we need line 10 above
    //never trust the client, validate the data
    Hubs.add(hubData)
    .then(hub => {
        res
            .status(201)
            .json(hub)
    })
    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({ 
                errorMessage: "Sorry, we ran into an error creating a new hub."
            });
    })
})

// delete a Hub
server.delete("/api/hubs/:id", (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
    .then(deleted => {
        res
            // .status(204).end()
            .status(200)
            .json(deleted)
    })
    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({ 
                errorMessage: "Sorry, we ran into an error removing a hub."
            });
    })
})

// update a Hub
server.put("/api/hubs/:id", (req, res) => {
    const id = req.params.id
    Hubs.update(id)
    .then(edited => {
        res
            .status(200)
            .json(edited)
    })
    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({ 
                errorMessage: "Sorry, we ran into an error updating a hub."
            });
    })
})


const port = 8000;
server.listen(port, () => console.log(`\n ** API on port: ${port} **`))


// fork > clone > type: npm i to get the dependencies
// type: npm i express to install the express library
// to run server, type: npm run server
// to solve the sqlite3 error, type: npm i sqlite3

