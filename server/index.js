const express = require('express');
const http = require('http');
const cors = require("cors");
const {
    Server
} = require("socket.io");
const fs = require('fs');

const PORT = 4000;

const app = express();

app.use(cors());

const httpServer = http.createServer(app)

const socketIO = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//Gets the JSON file and parse the file into JavaScript object
const rawData = fs.readFileSync('data.json');
const productData = JSON.parse(rawData.toString());

// cors support to allow share resources between different sources

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    //Listens to the addProduct event
    socket.on('addProduct', (data) => {
        productData['products'].push(data);
        const stringData = JSON.stringify(productData, null, 2);
        fs.writeFile('data.json', stringData, (err) => {
            console.error(err);
        });
        //Sends back the data after adding a new product
        socket.emit('addResponse', data);
    });

    //Listens for new bids from the client
    socket.on('bidProduct', (data) => {
        findProduct(
            data.name,
            productData['products'],
            data.last_bidder,
            data.price
        );
        //Sends back the data after placing a bid
        socket.emit('bidResponse', data);
    });

});


const findProduct = (nameKey, productsArray, last_bidder, new_price) => {
    productsArray.map((product) => {
        if (product.name === nameKey) {
            product.last_bidder = last_bidder;
            product.price = new_price;
        }
    })
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile('data.json', stringData, (err) => {
        console.error(err);
    });
}


app.get('/api', (req, res) => {
    res.json(productData);
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});