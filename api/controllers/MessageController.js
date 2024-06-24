/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  create: async function (req, res) {
    let response = { ...sails.config.custom.response };
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
  },

  findlastmessage: async function(req, res) {
  try {
    const { roomId } = req.params;
    const lastMessage = await Message.find({ room: roomId })
     .sort({ createdAt: -1 }) // sort by createdAt in descending order (newest first)
     .limit(1) // limit to a single message
      .populate('user');
    
    return res.json(lastMessage[0].content);
  } catch (err) {
    return res.serverError(err);
  }
}
};


