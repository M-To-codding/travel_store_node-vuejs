const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const dbActions = require("./db/actions");

const { validateUser } = require('./../services/validation');


exports.auth = async (req, res, next) => {

  const { error } = validateUser(req.body, true);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await dbActions.findUserByParams({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ message: 'Incorrect email or password.' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: 'Incorrect email or password.' });
  }

  const token = jwt.sign({
    _id: user._id,
    email: user.email,
    name: user.name,
    is_admin: user.isAdmin
  }, 'privateKey');

  res.send({ token: token });
};


