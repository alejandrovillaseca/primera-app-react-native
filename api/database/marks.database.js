const date = require('date-and-time');

exports.insertMark = function (collection, product, idProcess, db) {
    try {
        product.lastUpdate = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

        db.collection(collection).insertOne(JSON.parse(JSON.stringify(product)), (err, result) => {
            if (err) {
                console.log(err)
                throw new Error(err);
            }
        });
    } catch (error) {
        throw new Error("productInsertOne: " + error)
    }
}

