'use strict';

var _ = require('lodash');
var Instruction = require('./instruction.model');

// Get list of instructions
exports.index = function(req, res) {
  Instruction.find(function (err, instructions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(instructions);
  });
};

// Get a single instruction
exports.show = function(req, res) {
  Instruction.findById(req.params.id, function (err, instruction) {
    if(err) { return handleError(res, err); }
    if(!instruction) { return res.status(404).send('Not Found'); }
    return res.json(instruction);
  });
};

// Creates a new instruction in the DB.
exports.create = function(req, res) {
  Instruction.create(req.body, function(err, instruction) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(instruction);
  });
};

// Updates an existing instruction in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Instruction.findById(req.params.id, function (err, instruction) {
    if (err) { return handleError(res, err); }
    if(!instruction) { return res.status(404).send('Not Found'); }
    var updated = _.merge(instruction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(instruction);
    });
  });
};

// Deletes a instruction from the DB.
exports.destroy = function(req, res) {
  Instruction.findById(req.params.id, function (err, instruction) {
    if(err) { return handleError(res, err); }
    if(!instruction) { return res.status(404).send('Not Found'); }
    instruction.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}