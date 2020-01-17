const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');


let getAllUsers = (req, res) => {

  User.find({}, (err, docs) => {
    // mongoose.disconnect();

    if (docs.length === 0) {
      console.log(res.body, res.data)
      return res.status(200).send({ respType: 'empty', message: 'Users not found' });

    }

    if (err) {
      return console.error('error', err);
    }

    res.status(200).send(docs);
  })
};

let createUser = (req, res, signed) => {
  console.log('req', req.body)

  const user = new User(req.body);

  user.save((err) => {

    if (err) {
      return console.error(err);
    }

    console.log('Saved', user);

    res.status(200).send(user);
  });

  if (signed) {
    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  }
};

let updateUser = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body, function (err, result) {

    if (err) {
      return console.error(err);
    }

    console.log(result);
    res.status(200).send(result);
  });
};

let deleteUser = (req, res) => {
  console.log(req.body, req.params)
  User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.error(err);
    }

    res.status(200).send(result);
  })
};

async function register(req, res) {
  const { error } = req.body;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User already registered');
  }

  createUser(req, res, true);

};

async function signIn(req, res) {
  const user = await User.findOne({_id: req.user._id}).select('-password');
  User.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, config.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
  }
  res.send(user);
};


module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  register,
  signIn
};