function getAllUsers(axios) {
    return axios
        .get('http://localhost:8080/api/v1/admin/users')
        .then((res) => {
            // eslint-disable-next-line no-console
            console.log('response', res);
            return res.data;
        })
}

function createUser(axios, user) {
    return axios
        .post('http://localhost:8080/api/v1/admin/users', user)
        .then((res) => {
            // eslint-disable-next-line no-console
            console.log('response', res);
            return res.data;
        })
}

function updateUser(axios, user) {
    return axios
        .put(`http://localhost:8080/api/v1/admin/users/${user.id}`, user)
        .then((res) => {
            // eslint-disable-next-line no-console
            console.log('response', res);
            return res.data;
        })
}

function deleteUser(axios, id) {
    return axios
        .delete(`http://localhost:8080/api/v1/admin/users/${id}`)
        .then((res) => {
            // eslint-disable-next-line no-console
            console.log('response', res);
            return res.data;
        })
}

export const userCRUD = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
};