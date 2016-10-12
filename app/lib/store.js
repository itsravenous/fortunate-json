'use strict';
const fortune = require('fortune');
const resources = require('../resources');

function input (context, record, update) {
  // If it's a create request, return the record, ensuring we leave the db to generate an ID.
  if (context.request.method === 'create') return record;

  // If the update argument exists, it's an update request.
  if (update) return update;

  // Otherwise, it's a delete request and the return value doesn't matter.
  return null;
}

function output (context, record) {
  record.accessedAt = new Date();
  return record;
}

module.exports = fortune(resources, {
  transforms: {
    todo: [ input, output ]
  }
});
