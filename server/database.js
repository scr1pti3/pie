const mongodb = require("mongodb");
const {MongoClient} = mongodb;

const dbName = process.env.DB || 'test';

var _db;

module.exports = {
  connect: (uri, options, callback) => {
    MongoClient.connect(uri, options, (err, client) => {
      _db = client.db(dbName);

      return callback(err);
    });
  },
  getDb: () => _db,
  mongodb
}
