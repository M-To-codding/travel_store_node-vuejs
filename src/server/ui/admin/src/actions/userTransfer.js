const axios = require('axios');

function importCsv(data) {
  return axios
    .post('http://localhost:8080/api/v1/admin/users/import-csv', { data })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return res.data;
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log('error', err.response);
      if (err.response) {
        return { error: err.response.data.message, status: err.response.status };
      }

      return err;
    });
}

function exportCsv() {
  return axios
    .get('http://localhost:8080/api/v1/admin/users/export-csv')
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('response', res);
      return { status: res.status, link: res.data.link };
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('error', err.response);
      if (err.response) {
        return { error: err.response.data.message, status: err.response.status };
      }

      return err;
    });
}

const userTransfer = {
  importCsv,
  exportCsv,
};

export default userTransfer;
