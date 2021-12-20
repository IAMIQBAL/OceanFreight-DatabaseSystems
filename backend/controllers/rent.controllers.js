const rentInfo = require("../models/rent.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const rent = new rentInfo({
        contNo: req.body.contNo,
        cont_type: req.body.cont_type,
        lolo: req.body.lolo,
        cont_rent: req.body.cont_rent,
        liftoffdate: req.body.liftoffdate,
        liftonndate: req.body.liftonndate
    });

    rentInfo.create(req.params.cbId, req.params.passwd, rent, (err, data) => {
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