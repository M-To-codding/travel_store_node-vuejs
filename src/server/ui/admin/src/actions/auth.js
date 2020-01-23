function register(axios, user) {
  return axios.post('http://localhost:8080/api/v1/admin/register', user)
    .then((res) => {
      // const token = res
      // localStorage.setItem('user-token', token);
      // console.log('response', res);
      // eslint-disable-next-line no-console
      console.log('response', res);
      return Promise.resolve(res);
    })
    .catch((err) => err.response);
}

function signIn(axios, user) {
  return axios.post('http://localhost:8080/api/v1/admin/sign-in', user)
    .then((res) => {
      const { token } = res.data;

      if (token) {
        localStorage.setItem('user-token', token);
      }

      return Promise.reject(res);
    })
    .catch((err) => {
      if (err && err.response) {
        localStorage.removeItem('user-token');
        return err.response;
      }
      return err;
    });
}

function signOut(axios) {
  const data = { token: { tokenKey: localStorage.getItem('user-token') } };

  return axios.post('http://localhost:8080/api/v1/admin/sign-out', data)
    .then(
      () => {
        localStorage.removeItem('user-token');
      },
    )
    .catch((err) => {
      if (err.response) {
        return err.response;
      }

      return err;
    });
}

const auth = {
  register,
  signIn,
  signOut,
};

export default auth;
