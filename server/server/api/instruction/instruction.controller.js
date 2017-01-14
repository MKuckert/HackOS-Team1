'use strict';

var _ = require('lodash');
var Instruction = require('./instruction.model');
var instructions = {
    "instructions": [
        {
            "object_part": "feder1",
            "textual_instruction": "Bitte die Feder 1 aus dem Fach 43i5 entnehmen und in den Grundkörper einsetzen."
        },
        {
            "object_part": "feder2",
            "textual_instruction": "Bitte die Feder 2 aus dem Fach 87d2 entnehmen und in den Grundkörper einsetzen."
        },
        {
            "object_part": "greiferteil1",
            "textual_instruction": "Bitte einen Greifer-Teil aus dem Fach 3234 entnehmen und an den Grundkörper anbringen."
        },
        {
            "object_part": "greiferteil2",
            "textual_instruction": "Bitte einen Greifer-Teil aus dem Fach 3234 entnehmen und an den Grundkörper anbringen."
        }
    ]
};

// Get list of instructions
exports.index = function(req, res) {
  Instruction.find(function (err, instructions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(instructions);
  });
};

// Get a single instruction
exports.show = function(req, res) {
  /*Instruction.findById(req.params.id, function (err, instruction) {
    if(err) { return handleError(res, err); }
    if(!instruction) { return res.status(404).send('Not Found'); }
    return res.json(instruction);
  });*/

  instructions.instructions = instructions.instructions.sort(function(a, b) {
    return Math.round(Math.random()*2-1);
  });
  return res.json(instructions);
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