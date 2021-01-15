const Products = require("../models/products");

const find = async () => {
   return Products.findAll();
};

const insert = async (data) => {
   return Products.create({
      name: data.name,
      price: data.price,
      mrp: data.mrp,
      stock: data.stock,
      isPublished: false,
   });
};

const inspect = async (id) => {
   return Products.findByPk(id);
};
module.exports = { find, insert, inspect };
