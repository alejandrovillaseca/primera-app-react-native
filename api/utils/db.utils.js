const MongoClient = require('mongodb').MongoClient;
const connectionUrl = require("../config/db.config.json").CONN_URL;
const DB_NAME = require("../config/db.config.json").DB_NAME;

let instance = null,
    isDisconnecting = false;

exports.connect = () => {

    try {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectionUrl, {
                useNewUrlParser: true,
                keepAliveInitialDelay: 3600000,
                connectTimeoutMS: 3600000,
                socketTimeoutMS: 3600000
            }, (err, client) => {
                if (err) { reject(err); }
                instance = client;
                if (client == null) {
                    MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
                        if (err) { reject(err); }
                        if (client == null) resolve(this.connect())
                        instance = client;
                        resolve(client.db(DB_NAME));
                    });
                } else {
                    resolve(client.db(DB_NAME));
                }

            });
        });
    } catch (error) {
        throw new Error("Error en conexion DB --> " + error);
    }
};

exports.disconnect = () => {
    if (instance && !isDisconnecting) {
        isDisconnecting = true;
        return new Promise((resolve, reject) => {
            instance.close((err, result) => {
                if (err) { reject(err); isDisconnecting = false; return; }
                resolve();
            });
        })
    }
}