/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
   
  create: async function (req, res) {
    let response = { ...sails.config.custom.response };
    try {
      const { user1, user2 } = req.body;
      const room = await Room.find({ users: [user1, user2] })
      if (room) {
        response.status = 200;
        response.error = "room alredy exsists"
      }
      else {
        const room = await Room.create({ users: [user1, user2] }).fetch();
        return res.json(response.status,room);
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  list: async function(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne(userId);
      console.log('user: ', user.room);
      const rooms = await user.room.populate('messages');
      for (let room of rooms) {
      const lastMessage = room.messages[room.messages.length - 1];
      room.lastMessage = lastMessage;
    }   
      
      return res.json(rooms);
    } catch (err) {
      return res.serverError(err);
    }
  }

};

