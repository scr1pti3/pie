const express = require('express');
const assert = require('assert');

const driver = require('../database');
const ObjectId = driver.mongodb.ObjectId;

const router = express.Router();

router.get('/', async (req, res) => {
  console.log(req.method, req.originalUrl);
  try {
    const db = driver.getDb();

    const docs = await db.collection('panels').find().toArray();
    res.json(docs);
  } catch(err) {
    res.status(500).json({
      message: "Can't get data from database"
    })
  }
})

router.post('/', async (req, res) => {
  console.log(req.method, req.originalUrl, req.body);
  try {
    const db = driver.getDb();
    const result = await db.collection('panels').insertOne(req.body);
    res.json({
      createdPanel: req.body
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "failed to create panel"
    })
  }
})

router.put('/section', async (req, res) => {
  console.log(req.method, req.originalUrl, req.body);
  try {
    const db = driver.getDb();

    //The data to be modified on the database
    const payload = {
      ...req.body,
      _id: new ObjectId()
    };
    delete payload['position'];
    const result = await db.collection('panels').updateOne({
      _id: ObjectId(req.body._id)
    }, {
      $push: {
        sections: {
          $each: [payload],
          $position: req.body.position
        }
      }
    })

    //If no document is modified
    if (!result.modifiedCount) throw new driver.mongodb.MongoError('No document found')

    res.json({
      panelId: req.body._id,
      modifiedSection: payload
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Failed to create section"
    })
  };
})

module.exports = router;
