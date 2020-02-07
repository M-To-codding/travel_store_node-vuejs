function uploadFile(axios, file) {
  return axios
    .post('http://localhost:8080/api/v1/admin/file-upload', file)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    });
}
