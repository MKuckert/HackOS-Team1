'use strict';

var _ = require('lodash');
var Documentation = require('./documentation.model');

// Get list of documentations
exports.index = function(req, res) {
  Documentation.find(function (err, documentations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(documentations);
  });
};

// Get a single documentation
exports.show = function(req, res) {
  Documentation.findById(req.params.id, function (err, documentation) {
    if(err) { return handleError(res, err); }
    if(!documentation) { return res.status(404).send('Not Found'); }
    return res.json(documentation);
  });
};

// Creates a new documentation in the DB.
exports.create = function(req, res) {
  Documentation.create(req.body, function(err, documentation) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(documentation);
  });
};

// Updates an existing documentation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Documentation.findById(req.params.id, function (err, documentation) {
    if (err) { return handleError(res, err); }
    if(!documentation) { return res.status(404).send('Not Found'); }
    var updated = _.merge(documentation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(documentation);
    });
  });
};

// Deletes a documentation from the DB.
exports.destroy = function(req, res) {
  Documentation.findById(req.params.id, function (err, documentation) {
    if(err) { return handleError(res, err); }
    if(!documentation) { return res.status(404).send('Not Found'); }
    documentation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}