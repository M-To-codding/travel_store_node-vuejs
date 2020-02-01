const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = mongoose.model("User");
const Token = mongoose.model("Token");
const { validateUser } = require('./../../services/validation');


let getAllUsers = (req, res) => {

  User.find({}, (err, docs) => {
    // mongoose.disconnect();

    if (docs && docs.length === 0) {
      return res.status(200).send({ respType: 'empty', message: 'Users not found' });
    }

    if (err) {
      return console.error('error', err);
    }

    res.status(200).send(docs);
  })
};

let createUser = async (req, res, signed) => {

  const data = {
    name: req.body.name,
    role: req.body.role || 'author',
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    chartData: {
      sales: Math.random() * 100,
      expenses: Math.random() * 100,
      profit: Math.random() * 100,
    }
  }

  const { error } = validateUser(data);

  console.log('validation error', error)

  let existedUser = await User.findOne({ email: data.email });

  if (existedUser) {
    return res.status(400).send({ message: 'User already exists'});
  } else {

    const user = new User(data);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save((err) => {

      if (err) {
        return console.error(err);
      }

      const token = jwt.sign({ _id: user._id }, 'privateKey');
      new Token({
        userEmail: data.email,
        tokenKey: token,
        deleted: false
      }).save();

      if(signed) {
        let userClone = user;
         userClone.password = req.body.password;

        res.header('x-auth-token', token).send(userClone);
      } else {
        res.header('x-auth-token', token).send(user);
      }

      // res.status(200).send(user);
    });
  }
};

let updateUser = (req, res) => {
  let user = req.body;
  User.updateOne({ _id: req.params.id }, user, function (err, result) {

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
    return res.status(400).send({ message: 'User already registered'});
  }

  createUser(req, res, true);

};

async function findUserByParams(params) {
  return await User.findOne(params);
}

async function signOut(req, res) {
  console.log('req', req.body);
  const token = await Token.updateOne({ tokenKey: req.body.token.tokenKey }, { deleted: true });

  console.log('token', token);
  return res.status(200).send(token);
}

async function checkToken(tokenKey) {
  const token = await Token.findOne({ tokenKey: tokenKey });

  if (token && token.deleted) {
    return false;
  }

  return true;
}

async function insertUsers(req, res, data) {
  await User.insertMany(data, (err, docs)=>{

    if (err) {
      console.log('error', err);
      return res.status(400).send({ message: 'Csv file contains incorrect data'});
    } else {
      res.status(200).send('Success');
    }

  });
}


module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserByParams,
  register,
  signOut,
  checkToken,
  insertUsers,
};