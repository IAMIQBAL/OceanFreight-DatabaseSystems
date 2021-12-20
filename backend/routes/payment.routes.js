module.exports = app => {
    const payment = require("../controllers/payment.controllers.js");

    app.get("/payment/:senID/:passwd/:recID", payment.update);
    app.post("/payment/:recID/:passwd", payment.create);
}