'use strict';

var express = require('express');
var controller = require('./documentation.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/machine/:id', controller.show);
router.post('/machine/:id', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;