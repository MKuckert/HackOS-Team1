'use strict';

var _ = require('lodash');
var Documentation = require('./documentation.model');
var machineDocumentations = {};

// Get list of documentations
exports.index = function(req, res) {
  Documentation.find(function (err, documentations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(documentations);
  });
};

// Get a single documentation
exports.show = function(req, res) {
  var id = req.params.id || '';

  if(typeof id !== "string" || id.length===0) {
    return res.status(418).json({error: "expected GET parameter :id to be a non-empty string"});
  }
  var doc = machineDocumentations[id] || null;
  if(typeof id !== "object" || doc===null) {
    return res.status(418).json({error: "documentation with given id not found"});
  }
  
  return res.json(doc);
};

// Creates a new documentation in the DB.
exports.create = function(req, res) {
  var id = req.params.id || '';

  if(typeof id !== "string" || id.length===0) {
    return res.status(418).json({error: "expected GET parameter :id to be a non-empty string"});
  }
  console.log(typeof req.body);
  if(typeof req.body !== "object") {
    return res.status(418).json({error: "expected object as body"});
  }

  var constructedBy = req.body.constructed_by || '';
  var constructionOrder = req.body.construction_order || [];
  var validatedOrder = [];
  if(typeof constructedBy !== "string" || constructedBy.length===0) {
    return res.status(418).json({error: "expected constructed_by to be a non-empty string"});
  }
  if(typeof constructionOrder !== "array" || constructionOrder.length===0) {
    return res.status(418).json({error: "expected construction_order to be a non-empty array"});
  }
  for (var i = constructionOrder.length - 1; i >= 0; i--) {
    var objectPart = constructionOrder[i].object_part || null;
    if(typeof objectPart !== "string" || objectPart.length===0) {
      return res.status(418).json({error: "expected construction_order[*].object_part to be a non-empty string"});
    }
    validatedOrder.push({object_part: objectPart});
  }

  var doc = {
    constructed_by: constructedBy,
    constructed_at: new Date(),
    construction_order: validatedOrder
  };
  machineDocumentations[id] = doc;
  console.log(doc);
  res.status(204);
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