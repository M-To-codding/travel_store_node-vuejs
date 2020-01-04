module.exports = function (app, db) {
    const router = require('express').Router();
    const dbActions = require('./../services/db/actions');


    router.get("/", (req, res) => {
        res.status(200).send('Hello World! Routing works!')
    });


    router.route('/users')
        .get(dbActions.getAllUsers)
        .post(dbActions.createUser);


    router.route('/users/:id')
        .delete(dbActions.deleteUser)
        .put(dbActions.updateUser);


    return router;
};