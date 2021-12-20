const shipInfo = require("../models/ship.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const ship = new shipInfo({
        shipNo: req.body.shipNo,
        NoCont: req.body.NoCont,
        src: req.body.src,
        dest: req.body.dest,
        depart_time: req.body.depart_time,
        arr_time: req.body.arr_time
    });

    shipInfo.create(req.params.cbId, req.params.passwd, ship, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else {
            res.send(data);
            console.log(data);
        }
    });
};