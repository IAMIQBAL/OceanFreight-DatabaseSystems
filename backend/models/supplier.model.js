const sql = require('./db.js');

const Supplier = function(supplier){
    this.id = supplier.id;
    this.email = supplier.email;
    this.companyname = supplier.companyname;
    this.address = supplier.address;
    this.port = supplier.port;
    this.contact = supplier.contact;
    this.password = supplier.password;
};

Supplier.create = (newSupplier, result) => {
    sql.query("INSERT INTO supplier SET ?", newSupplier, (err, res) =>{
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Supplier Created: ", {id: res.insertId, ...newSupplier});
        result(null, {id: res.insertId, ...newSupplier});
    });
};

Supplier.find = (supplierId, password, result) => {
    sql.query("SELECT id FROM supplier WHERE id = "+ supplierId + " AND password = " + '"'+ password +'"', (err, res) => {
    if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
    } 
    if (res.length){
        console.log("SignedIn");
        result(null, res[0]);
        return;
    }

    result({kind: "not_found"}, null);
    });
}

Supplier.getAll = result => {
    sql.query("SELECT email, companyname, address, port, contact FROM supplier", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Suppliers: ", res);
        result(null, res);
    });
};

module.exports = Supplier;