const sql = require('./db.js')

const recieverInfo = function(recieverInfo){
    this.recID = recieverInfo.recID;
    this.recName = recieverInfo.recName;
    this.recPhNo = recieverInfo.recPhNo;
    this.product = recieverInfo.product;
    this.price = recieverInfo.price;
    this.dest = recieverInfo.dest;
    this.status = recieverInfo.status;
    this.passwd = recieverInfo.passwd;
}

// Signup
recieverInfo.create = (newReceiverInfo, result) => {
    sql.query("INSERT INTO receiver SET ?", newReceiverInfo, (err, res) => {
        if (err) {
            console.log("Receiver not created", err);
            result(null, err);
            return;
        }
        console.log("Signed up");
        result(null, {id: res.senID})
    })
}

// Login
recieverInfo.login = (recieverId, passwd, result) => {
    sql.query("SELECT * FROM receiver WHERE recID = "+ recieverId + " and passwd = " + passwd, (err, res) => {
    if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
    }
    result(null, res);
    if (Object.keys(res).length != 0){
        sql.query("UPDATE receiver SET status = 1 WHERE recID = "+ recieverId);
    }
    });
}

module.exports = recieverInfo;