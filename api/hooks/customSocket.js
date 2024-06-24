module.exports = function defineCustomSocketHook(sails) {
  return {
    initialize: async function() {
      sails.log.info('Initializing custom hook (`customSocket`)');

      sails.on('lifted', () => {
        const io = sails.io;
        
        io.on('connection', (socket) => {
          sails.log.info('A user connected');

          socket.on('sendMessage', async (data) => {
            try {
              const message = await Message.create(data).fetch();
              io.emit('message', message);
            } catch (err) {
              sails.log.error(err);
            }
          });

          socket.on('disconnect', () => {
            sails.log.info('A user disconnected');
          });
        });
      });
    }
  };
};
