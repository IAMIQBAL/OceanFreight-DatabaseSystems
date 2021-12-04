module.exports = app => {
    const goods = require("../controllers/goods.controllers.js");

    app.get("/goodsinfo/:supplierId", goods.goodsInfo);

    app.put("/goodsinfo/:supplierId", goods.update);

    app.post("/goodsinfo", goods.create);
};