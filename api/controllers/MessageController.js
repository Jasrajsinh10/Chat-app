/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/MessageController.js
module.exports = {
  create: async function (req, res) {
    let response = { ...sails.config.custom.response };
    try {
      const { content, userId, roomId } = req.body;
      
      if (!content || !userId || !roomId) {
        response.status = 400;
        response.error = "Content, userId or roomId not provided";
        return res.status(400).json(response);
      }

      // Find the Userrooms entry
      const userRoom = await Userrooms.findOne({ user: userId, rooms: roomId });
      if (!userRoom) {
        response.status = 400;
        response.error = "User is not part of the room";
        return res.status(400).json(response);
      }

      // Create the message
      const message = await Message.create({ content:content, RoomUser: userRoom.id }).fetch();
      response.status = 201;
      response.data = message;
      return res.status(201).json(response);
      
    } catch (err) {
      response.status = 500;
      response.error = err;
      return res.serverError(response);
    }
  },

  list: async function (req, res) {
    let response = { ...sails.config.custom.response };
    try {
      const { roomId } = req.params;

      if (!roomId) {
        response.status = 400;
        response.error = "roomId not provided";
        return res.status(400).json(response);
      }

      // Find all messages in the room
      const userRooms = await Userrooms.find({ rooms: roomId }).populate('user');
      const messages = await Message.find({ RoomUser: userRooms.map(ur => ur.id) }).populate('RoomUser');

      // Include user details in messages
      for (let message of messages) {
        const userRoom = userRooms.find(ur => ur.id === message.RoomUser);
        message.user = userRoom ? userRoom.user : null;
      }

      response.status = 200;
      response.data = messages;
      return res.status(200).json(response);
      
    } catch (err) {
      response.status = 500;
      response.error = err;
      return res.serverError(response);
    }
  }
};

