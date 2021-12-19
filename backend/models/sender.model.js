const sql = require('./db.js')

const senderInfo = function(senderInfo){
    this.senID = senderInfo.senID;
    this.senName = senderInfo.senName;
    this.senPhNo = senderInfo.senPhNo;
    this.product = senderInfo.product;
    this.price = senderInfo.price;
    this.src = senderInfo.src;
    this.status = senderInfo.status;
    this.passwd = senderInfo.passwd;
}

// Signup
senderInfo.create = (newSenderInfo, result) => {
    sql.query("INSERT INTO sender SET ?", newSenderInfo, (err, res) => {
        if (err) {
            console.log("Sender not created", err);
            result(null, err);
            return;
        }
        console.log("Signed up");
        result(null, {id: res.senID})
    })
}

// Login
senderInfo.login = (senderId, passwd, result) => {
    sql.query("SELECT * FROM sender WHERE senID = "+ senderId + " and passwd = " + passwd, (err, res) => {
    if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
    }
    result(null, res);
    if (Object.keys(res).length != 0){
        sql.query("UPDATE sender SET status = 1 WHERE senID = "+ senderId);
    }
    });
}

module.exports = senderInfo;