const collection = "marks"
const dbUtils = require('../utils/db.utils')
var ObjectId = require('mongodb').ObjectID;

exports.getAllCords = () => {
    return new Promise((resolve, reject) => {
        dbUtils.connect().then(db => {
            db.collection(collection).find().toArray().then(obj => {
                resolve(obj)
            }).catch(err => {
                console.log(err)
                reject("Error")
            })
        })
    })
}
exports.markInsert = (latitude, longitude, name) => {
    var markToInsert = {
        latitude: latitude,
        longitude: longitude,
        name: name
    }

    dbUtils.connect().then(db => {
        db.collection(collection).insertOne(JSON.parse(JSON.stringify(markToInsert)), (err, result) => {
            if (err) {
                console.log(err)
                throw err
            }
            //Insertado
            console.log(result)
            //dbUtils.disconnect();
        })

    })
}

exports.markDelete = (id) => {
    try {
        var markToDelete = { "_id": ObjectId(id) }
        dbUtils.connect().then(db => {
            db.collection(collection).deleteOne(markToDelete).then(obj => {
                console.log(obj.deletedCount)
                // if (obj.deletedCount === 0)
                //     return Promise.reject({ message: "No se encontró un marcador para eliminar" })
                // else
                //     return Promise.resolve({ message: "Registro eliminado" })
            })
        }).catch(err => {
            console.log(err)
            //return Promise.reject("Error")
        })
    } catch (error) {
        return Promise.reject("Error")
    }

}