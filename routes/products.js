const router = require("express").Router();
const { log } = require("debug");
const controller = require("../controllers/products");
const Product = require("../models/products");

router.get("/", async (req, res, next) => {
   await Product.findAll()
      .then((result) => {
         res.status(200).json([...result]);
      })
      .catch((err) => {
         res.status(err.status || 500).json(err);
      });
});

router.post("/", (req, res, next) => {
   Product.create({
      name: req.body.name,
      price: req.body.price,
      mrp: req.body.mrp,
      stock: req.body.stock,
      isPublished: false,
   })
      .then((result) => {
         res.status(201).json({
            ...result,
         });
      })
      .catch((err) => {
         res.status(err.status || 500).json(err);
      });
});

router.patch("/:id", (req, res) => {
   const id = req.params.id;
   var message = [];
   Product.findByPk(id)
      .then((data) => {
         if (data) {
            if (data.mrp < data.price) {
               message.push("MRP should be less than equal to the Price");
            }
            if (data.stock <= 0) {
               message.push("Stock count is 0");
            }
         }
         message.length === 0
            ? res.status(204).json()
            : res.status(422).json(message);
      })
      .catch((err) => {
         res.status(422);
      });
});

router.put("/:id", (req, res) => {
   res.status(405).json();
});

router.delete("/:id", (req, res) => {
   res.status(405).json();
});

module.exports = router;
