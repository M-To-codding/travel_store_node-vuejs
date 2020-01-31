const axios = require('axios');

function importCsv(data) {
  // const options = {
  //   headers: { 'Content-type': 'multipart/form-data' },
  // };
  // eslint-disable-next-line no-console

  return axios
    .post('http://localhost:8080/api/v1/admin/users/import-csv', { data })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    });
}

function exportCsv() {
  return axios
    .get('http://localhost:8080/api/v1/admin/users/export-csv')
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    });
}

const userTransfer = {
  importCsv,
  exportCsv,
};

export default userTransfer;
