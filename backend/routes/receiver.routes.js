module.exports = app => {
    const receiver = require("../controllers/receiver.controllers.js");

    app.post("/receiver", receiver.create);
    app.get("/receiver/:recID/:passwd", receiver.loggedIn);
}