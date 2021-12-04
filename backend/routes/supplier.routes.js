module.exports = app => {
    const supplier = require("../controllers/supplier.controllers.js");

    app.post("/supplier", supplier.create);
    
    app.get("/suppliers", supplier.findAll);

    app.get("/supplier/:supplierId/:password", supplier.signIn);
};