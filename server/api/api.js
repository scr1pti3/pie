const express = require('express');
const assert = require('assert');

const mongodb = require('../database.js');
const router = express.Router();

router.route('/panel')
  .get((req, res) => {
    const db = mongodb.getDb();
    db.collection('panels').find().toArray((err, docs) => {
      if (err) throw err
      res.json(docs);
    });
  })
  .post((req, res) => {
    const db = mongodb.getDb();
    db.collection('panels').insertOne(req.body, (err, result) => {
      if(err) throw err
      res.json({createdPanel: result.ops[0]});
    });
  })


module.exports = router;
