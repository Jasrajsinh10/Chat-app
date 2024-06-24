/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    messages: {
      collection: 'message',
      via: 'user',
    },
    rooms: {
      collection: 'room',
      via: 'users',
    },
  },
};

