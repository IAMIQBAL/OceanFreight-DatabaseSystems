module.exports = app => {
    const sender = require("../controllers/sender.controllers.js");

    app.post("/sender", sender.create);
    app.get("/sender/:senID/:passwd", sender.loggedIn);
}