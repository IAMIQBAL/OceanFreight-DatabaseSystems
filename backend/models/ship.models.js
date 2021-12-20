const sql = require('./db.js')

const shipInfo = function(shipInfo){
    this.shipNo = shipInfo.shipNo;
    this.NoCont = shipInfo.NoCont;
    this.src = shipInfo.src;
    this.dest = shipInfo.dest;
    this.depart_time = shipInfo.depart_time;
    this.arr_time = shipInfo.arr_time;
}

// Payment - Created by receiver
shipInfo.create = (cbId, passwd, shipInfo, result) => {
    sql.query("SELECT status FROM Custom_Broker WHERE CBId = " + cbId + " and passwd = " + passwd, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query("INSERT INTO ship SET ?", shipInfo, (err, res) => {
                    console.log(shipInfo)
                    if (err) {
                        console.log("rent Info not created", err);
                        result(null, err);
                        return;
                    }
                })
            }
        }
    })
}

module.exports = shipInfo;