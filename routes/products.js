const router = require("express").Router();
const controller = require("../controllers/products");
const Product = require("../models/products");

router.get("/", async (req, res, next) => {
   await Product.findAll()
      .then((result) => {
         console.log(result);
         res.status(200).json({
            result,
         });
      })
      .catch((err) => {
         res.status(err.status || 500).json({
            error: err,
         });
      });
});

router.post("/", (req, res, next) => {
   Product.create({
      name: req.body.name,
      price: req.body.price,
      mrp,
   });
});
module.exports = router;
