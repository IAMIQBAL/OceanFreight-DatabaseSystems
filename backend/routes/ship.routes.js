const shipInfo = require("../models/ship.models.js");

module.exports = app => {
    const ship = require("../controllers/ship.controllers.js");

    app.post("/ship/:cbId/:passwd", ship.create);
}