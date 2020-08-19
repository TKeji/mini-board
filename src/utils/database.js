// Connect to the Mongodb database
const { MongoClient } = require("mongodb");
const assert = require("assert");
let _db;

const mongoConnect = async (cb) => {
   try {
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
         useUnifiedTopology: true
      });
      _db = client.db();
      cb();
   } catch (err) {
      console.log(err.message);
      throw new Error("Unable to connect to DB");
   }
};

const getDB = () => {
   if (_db) {
      return _db;
   }
   throw new Error("Unable to find DB");
};

const listDBs = async () => {
   try {
      const dbList = await _db.admin().listDatabases();
      return dbList.databases;
   } catch (e) {
      throw new Error("Can't get Database list");
   }
};

module.exports = {
   mongoConnect,
   getDB,
   listDBs
};
