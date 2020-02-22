module.exports = function (app, db) {
    const router = require('express').Router();
    const dbActions = require('./../services/db/actions');
    const {auth} = require('./../services/auth');
    const {exportCsvData, importCsvData} = require('./../services/csv/csv-service');
    const fileActions = require('./../services/upload-files_controller');


    router.get("/", (req, res) => {
        res.status(200).send('Hello World! Routing works!')
    });


    router.route('/users')
        .get(dbActions.getAllUsers)
        .post(dbActions.createUser);


    router.route('/users/:id')
        .delete(dbActions.deleteUser)
        .put(dbActions.updateUser);


    router.post('/register', dbActions.register);

    router.post('/sign-in', auth);
    router.post('/sign-out', dbActions.signOut);


    router.get('/users/export-csv', exportCsvData);
    router.post('/users/import-csv', importCsvData);


    router.get('/file-upload', fileActions.getAllFiles);
    router.post('/file-upload', fileActions.uploadFiles);
    router.delete('/file-upload/:id', fileActions.deleteImage);

    return router;
};