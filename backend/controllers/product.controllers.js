const productInfo = require("../models/product.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const product = new productInfo({
        contNo: req.body.contNo,
        product: req.body.product,
        Qnty: req.body.Qnty,
        totalprice: req.body.totalprice,
        status: req.body.status,
        shipNo: req.body.shipNo,
        recID: req.body.recID,
        CBId: req.body.CBId
    });

    productInfo.create(req.params.recieverId, req.params.passwd, product, (err, data) => {
        // console.log(req.params.recieverId);
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    productInfo.update(req.params.senID, req.params.passwd, req.params.contNo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.sendStatus(200);
    });
};