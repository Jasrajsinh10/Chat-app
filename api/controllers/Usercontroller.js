module.exports = {
  
  create: async function (req, res) {
    let response = { ...sails.config.custom.response };
    const { username } = req.body;
    try {
      if (!username) {
        response.status = 400;
        response.error = "username not given"
        return res.status(400).json(response)
      }
      // First, check if the user already exists
      const existingUser = await User.findOne({ username });
      
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

  find: async function (req, res) {
    let response = { ...sails.config.custom.response };
    try {
      const users = await User.find();
      response.status = 200;
      response.data = users;
      response.message = "List of all users"
      return res.status(200).json(response);
    } catch (err) {
      response.status = 400;
      response.error = err;
      return res.serverError(response);
    }
  },
};

