const GoodsInfo = require("../models/goods.model.js");

exports.goodsInfo = (req, res) => {
    GoodsInfo.getGoodsInfo(req.params.supplierId, (err, data) => {
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message: 'Supplier not found'
                });
            } else {
                res.status(500).send({
                    message: 'Server side Error'
                });
            }
        }  else {
            res.send(data);
        }
    })
}

exports.update = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Update operation failed"
        })
    }

    GoodsInfo.updateStatus(
        req.params.supplierId, new GoodsInfo(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found"){
                    res.status(404).send({
                        message: "Record not found"
                    });
                } else {
                    res.status(500).send({
                        message: "Error"
                    });
                }
            } else res.send(data);
        }
    )
}

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const goods = new GoodsInfo({
        id: req.body.id,
        goods: req.body.goods,
        qty: req.body.qty,
        containerno: req.body.containerno,
        port: req.body.port,
        destination: req.body.destination,
        shipno: req.body.shipno,
        due: req.body.due,
        advance: req.body.advance,
        sizeofcontainer: req.body.sizeofcontainer,
        noofcontainers: req.body.noofcontainers,
        status: req.body.status,
    });

    console.log("Goods Body: ", goods);

    GoodsInfo.create(goods, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.send(data);
    });
};