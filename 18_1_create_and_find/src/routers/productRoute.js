const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router
  .post("/products", async (req, res) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .get("/products", async (req, res) => {
    try {
      const result = await Product.find({});
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .get("/products/active", async (req, res) => {
    try {
      const result = await Product.find(req.body);
      if (!result) {
        return res.status(404).send("product not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .get("/products/pricerange", async (req, res) => {
    try {
      const min = req.query.min;
      const max = req.query.max;
      const result = await Product.find({
        "details.price": { $gt: min, $lt: max },
      });
      if (!result) {
        return res.status(404).send("product not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .get("/products/:id", async (req, res) => {
    try {
      const result = await Product.findOne({ _id: req.params.id });
      if (!result) {
        return res.status(404).send("product not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .put("/products/:id", async (req, res) => {
    try {
      const toUpdateArr = Object.keys(req.body);
      const allowedUpdates = [
        "name",
        "category",
        "isActive",
        "details.description",
        "details.price",
        "details.discount",
        "details.images",
        "details.phone",
        "details.date",
      ];
      const isValidUpdate = toUpdateArr.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidUpdate) {
        return res.status(400).send("Invalid update!");
      }
      const result = await Product.updateOne({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!result) {
        return res.status(404).send("product not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .delete("/products/:id", async (req, res) => {
    try {
      const result = await Product.deleteOne({ _id: req.params.id });
      if (!result) {
        return res.status(404).send("product not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .delete("/products", async (req, res) => {
    try {
      const result = await Product.deleteMany({});
      if (!result) {
        return res.status(404).send("products not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })

module.exports = router;
