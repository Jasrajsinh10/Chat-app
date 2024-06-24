/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function(req, res) {
    try {
      const message = await Message.create(req.body).fetch();
      return res.json(message);
    } catch (err) {
      return res.serverError(err);
    }
  },

  find: async function(req, res) {
    try {
      const { roomId } = req.params;
      const messages = await Message.find({ room: roomId }).populate('user');
      return res.json(messages);
    } catch (err) {
      return res.serverError(err);
    }
  }
};


