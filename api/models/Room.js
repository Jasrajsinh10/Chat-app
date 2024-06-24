/**
 * Room.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    users: {
      collection: 'user',
      type:"array",
      via: 'rooms',
    },
    messages: {
      collection: 'message',
      via: 'room',
    },
  },
};


