const axios = require('axios');

const headers = {
  accept: 'application/json',
  'Accept-Language': 'en-US,en;q=0.8',
  'Content-Type': 'multipart/form-data',
};

function getAllImages() {
  return axios
    .get('http://localhost:8080/api/v1/admin/file-upload', { type: 'image' })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    });
}

function uploadImage(file) {
  return axios
    .post('http://localhost:8080/api/v1/admin/file-upload', file, { headers })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    });
}

function deleteFile(id) {
  return axios
    .delete(`http://localhost:8080/api/v1/admin/file-upload/${id}`)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    });
}


function getAllVideos() {
  return axios
    .get('http://localhost:8080/api/v1/admin/file-upload', { type: 'video' })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    });
}

const mediaCRUD = {
  uploadImage,
  getAllImages,
  deleteFile,
  getAllVideos,
};

export default mediaCRUD;
