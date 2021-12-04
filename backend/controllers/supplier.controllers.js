const Supplier = require("../models/supplier.model.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const supplier = new Supplier({
        id: req.body.id,
        email: req.body.email,
        companyname: req.body.companyname,
        address: req.body.address,
        port: req.body.port,
        contact: req.body.contact,
        password: req.body.password
    });

    console.log("Suppliers Body: ", supplier);

    Supplier.create(supplier, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Supplier.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.send(data);
    });
};

exports.signIn = (req, res) => {
    Supplier.find(req.params.supplierId, req.params.password, (err, data) => {
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message: 'Login Failed'
                });
            } else {
                res.status(500).send({
                    message: 'Server side Error'
                });
            }
        }  else {
            res.sendStatus(200);
        }
    })
}

