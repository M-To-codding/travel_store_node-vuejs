const axios = require('axios');

const headers = {
  // accept: 'application/json',
  // 'Accept-Language': 'en-US,en;q=0.8',
  'Content-Type': 'multipart/form-data',
};

function uploadFile(file) {
  return axios
    .post('http://localhost:8080/api/v1/admin/file-upload', { file }, { headers })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    });
}

const uploadMedia = {
  uploadFile,
};

export default uploadMedia;
