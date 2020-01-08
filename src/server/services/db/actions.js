const mongoose = require('mongoose');
const User = mongoose.model("User");


let getAllUsers = (req, res) => {

    User.find({}, (err, docs) => {
        // mongoose.disconnect();

        if(docs.length === 0) {
            console.log(res.body, res.data)
            return res.status(200).send({respType: 'empty', message: 'Users not found'});

        }

        if (err) {
            return console.error('error', err);
        }

        res.status(200).send(docs);
    })
};

let createUser = (req, res) => {
    console.log('req', req.body)

    const user = new User(req.body);

    user.save((err) => {

        if (err) {
            return console.error(err);
        }

        console.log('Saved', user);

        res.status(200).send(user);
    });
};

let updateUser = (req, res) => {
    User.updateOne({_id: req.params.id}, req.body, function (err, result) {

        if (err) {
            return console.error(err);
        }

        console.log(result);
        res.status(200).send(result);
    });
};

let deleteUser = (req, res) => {
    console.log(req.body, req.params)
    User.findOneAndDelete({_id: req.params.id}, (err, result) => {
        if (err) {
            console.error(err);
        }

        res.status(200).send(result);
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}