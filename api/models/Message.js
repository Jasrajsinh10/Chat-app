/**
 * Message.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const userrooms = require("./userrooms");

module.exports = {
  attributes: {
    content: {
      type: 'string',
      required: true,
    },
    RoomUser: {
      model: "Userrooms",
      required : true
    }
  },
};


