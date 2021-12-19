module.exports = app => {
    const cb = require("../controllers/custombroker.controllers.js");

    app.post("/cb", cb.create);
    app.get("/cb/:cbId/:passwd", cb.loggedIn);
}