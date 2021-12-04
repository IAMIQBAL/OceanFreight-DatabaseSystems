const sql = require('./db.js');

const GoodsInfo = function(goodsInfo){
    this.id = goodsInfo.id;
    this.goods = goodsInfo.goods;
    this.qty = goodsInfo.qty;
    this.containerno = goodsInfo.containerno;
    this.port = goodsInfo.port;
    this.destination = goodsInfo.destination;
    this.shipno = goodsInfo.shipno;
    this.due = goodsInfo.due;
    this.advance = goodsInfo.advance;
    this.sizeofcontainer = goodsInfo.sizeofcontainer;
    this.noofcontainers = goodsInfo.noofcontainers;
    this.status = goodsInfo.status;
}

GoodsInfo.getGoodsInfo = (supplierId, result) => {
    sql.query("SELECT * FROM goods_info WHERE id = "+ supplierId, (err, res) => {
    if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
    } 

    console.log("Info: ", res);
    result(null, res);
    });
}

GoodsInfo.updateStatus = (id, goods, result) => {
    sql.query("UPDATE goods_info SET status = ? WHERE id = ?", [goods.status, id], (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("Status Updated");
        result(null, {id: id, ...goods});
    });
};

GoodsInfo.create = (newGoodsInfo, result) => {
    sql.query("INSERT INTO goods_info SET ?", newGoodsInfo, (err, res) => {
        if (err) {
            console.log("Error", err);
            result(err, null);
            return;
        }

        console.log("Goods Created: ", {id: res.insertId, ...newGoodsInfo});
        result(null, {id: res.insertId, ...newGoodsInfo});
    })
}

module.exports = GoodsInfo;