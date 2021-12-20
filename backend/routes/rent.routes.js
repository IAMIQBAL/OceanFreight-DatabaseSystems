const rentInfo = require("../models/rent.models.js");

module.exports = app => {
    const rent = require("../controllers/rent.controllers.js");

    app.post("/rent/:cbId/:passwd", rent.create);
}