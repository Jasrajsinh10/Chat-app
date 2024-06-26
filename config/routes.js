/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /user': 'Usercontroller.create',
  // 'GET /user': 'UserController.find',
  'POST /room': 'RoomController.create',
  'GET /room/:userId': 'RoomController.list',
  'POST /message': 'MessageController.create',
  'GET /message/:roomId': 'MessageController.find',
  'GET /lastmessage/:roomId': 'MessageController.findlastmessage',
};

