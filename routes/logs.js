var router = require('express').Router();
var Log = require('../models/log');

router.get('/', (req,res) => {
    Log.find({ owner: req.user}).then((logs) => {
        res.json(logs);
    });
});

router.post('/', (req, res) => {
    var log = new Log({
        description: req.body.log.description,
        result: req.body.log.result,
        date: req.body.log.date,
        owner: req.user,
        definition: req.body.definition
    });

    log.save().then((log) => {
        res.json({
          message: 'saved!',
          log: log
        });
    });
});

router.put('/:id', (req, res) => {
    Log.findOne({_id: req.params.id, owner: req.user}).then((log) => {
        log.result = req.body.log.result;
        log.description = req.body.log.description;
        log.date = req.body.log.date;
        log.defintion = req.body.defintion;

        log.save().then((log) => {
            res.json({
              message: 'updated!',
              log: log
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    Log.findOne({_id: req.params.id, owner: req.user}).then((log) => {
      log.remove().then(() => {
          res.json({
            message: 'deleted!',
            log: log
          });
      });
    });
});
