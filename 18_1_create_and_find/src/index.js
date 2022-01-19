const express = require('express');
require('./db/mongoose');
const Product = require('./models/product');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.post("/products", async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         const result = await product.save();
//         res.status(201).send(result);
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// });

app.get("/products", async (req, res) => {
    try {
        const result = await Product.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.get("/products/active", async (req, res) => {
    try {
        const result = await Product.find(req.body);
        if (!result) {
            return res.status(404).send('product not found');
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
});

app.get("/products/pricerange", async (req, res) => {
    try {
        const min = req.query.min;
        const max = req.query.max;
        const result = await Product.find({"details.price": { $gt :  min, $lt : max}});
        if (!result) {
            return res.status(404).send('product not found');
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const result = await Product.findOne({_id: req.params.id});
        if (!result) {
            return res.status(404).send('product not found');
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
});


app.listen(port, () => {
    console.log(`Server is up on port - ${port}`);
});