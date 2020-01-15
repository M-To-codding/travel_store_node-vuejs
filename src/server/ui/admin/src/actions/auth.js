function register(axios, data) {
  axios.auth(data);
}

function signIn(axios, data) {
  axios.auth(data);
}

const auth = {
  register,
  signIn,
}

export default auth;
