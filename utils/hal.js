'use strict';

const assert = require('assert');
const halson = require('halson');

exports.makeCollection = (collection, name, url) => {
  assert(
    Array.isArray(collection) && collection.every(({ id }) => !!id),
    'Hal collection can wrap only arrays of entities with ID property',
  );

  const embed = collection.map(entity => halson(entity).addLink('self', `${url}/${entity.id}`));
  // TODO add possibility to set collection page
  return halson().addLink('self', `${url}`).addEmbed(name, embed);
};

exports.makeEntity = (entity, url) => halson(entity).addLink('self', `${url}`);
