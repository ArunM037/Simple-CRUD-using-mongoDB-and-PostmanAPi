const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectTodb: (cb) => {
        MongoClient.connect("Get Your link")
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            });
    },
    getDb: () => dbConnection
};
