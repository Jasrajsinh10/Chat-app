/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const userrooms = require("../models/userrooms");

module.exports = {
   
  create: async function (req, res) {
    let response = { ...sails.config.custom.response };
    try {
      const { roomname,user1,user2} = req.body;
      console.log('user: ', user1,user2);
      if (!roomname) {
        response.status = 400;
        response.error = "roomname not given"
        return res.status(400).json(response)
      }
      const room = await Room.findOne({ roomname })
      if (room) {
        response.status = 200;
        response.error = "room alredy exsists"
        return res.json(response);
      }
      else {
        const room = await Room.create({ roomname }).fetch();
        console.log('room: ', room);
        const roomid = room.id;
        const user1room = await Userrooms.create({ user:user1, rooms:roomid }).fetch();
        console.log('user1room: ', user1room);
        const user2room = await Userrooms.create({ user:user2, rooms:roomid }).fetch();
        console.log('user2room: ', user2room);
        response.status = 201;
        response.data = room;
        return res.json(response);
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

