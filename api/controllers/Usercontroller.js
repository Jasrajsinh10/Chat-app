module.exports = {
  create: async function(req, res) {
    try {
      const user = await User.create(req.body).fetch();
      return res.json(user);
    } catch (err) {
      return res.serverError(err);
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

