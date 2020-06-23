var express = require('express');
var router = express.Router();
var markInsert = require('../controller/marks.controller')


/* POST. */

router.get('/getCords', function (req, res, next) {
  markInsert.getAllCords().then(obj => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj, null, 4));
    
  })

});
router.post('/insert', function (req, res, next) {
  const { latitude, longitude, name } = req.body
  markInsert.markInsert(latitude, longitude, name)
  res.status(200).json("OK")
});
router.post('/delete', function (req, res, next) {
  const { id } = req.body
  markInsert.markDelete(id)
  res.status(200).json("OK")

});

module.exports = router;
