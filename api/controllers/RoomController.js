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
      const  userId  = req.params;
      const rooms = await Room.find({ users: userId }).populate('users');
      
      for (let room of rooms) {
        const lastMessage = await Message.find({ room: room.id })
          .sort('createdAt DESC')
          .limit(1);
        room.lastMessage = lastMessage[0];
      }
      
      return res.json(rooms);
    } catch (err) {
      return res.serverError(err);
    }
  }

};

