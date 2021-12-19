module.exports = app => {
    const product = require("../controllers/product.controllers.js");

    app.post("/product/:recieverId/:passwd", product.create);
    app.get("/product/:senID/:passwd/:contNo", product.update);

}