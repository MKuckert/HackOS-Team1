/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Documentation = require('./documentation.model');

exports.register = function(socket) {
  Documentation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Documentation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('documentation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('documentation:remove', doc);
}