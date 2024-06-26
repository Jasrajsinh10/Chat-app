module.exports = {
  create: async function (req, res) {
    let response = { ...sails.config.custom.response };
    const { username } = req.body;

    try {
      // First, check if the user already exists
      const existingUser = await User.findOne({ username });
      console.log('existingUser: ', existingUser);
      
      if (existingUser) {
        // User exists, return the existing user
        response.status = 200;
        response.data = existingUser;
        return res.status(200).json(response);
      } else {
        // User does not exist, create a new user
        const newUser = await User.create({ username}).fetch();
        response.status = 201;
        response.data = newUser;
        return res.status(201).json(response);
      }
    } catch (err) {
      response.status = 400;
      response.error = err;
      return res.serverError(response);
    }
  },

  find: async function(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.serverError(err);
    }
  },
};

