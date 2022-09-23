import axios from 'axios';

export const retrieveUserData = data =>
  axios
    .get(`${'http://192.168.1.4:3333/users'}${data}`)
    .then(function (response) {
      const res = [response.data, response.headers['x-total-count']];
      return res;
    })
    .catch(function (error) {
      console.log(error);
      return 'error';
    });

export const deleteData = query => {
  console.log(query, 'query');
  axios
    .delete(`http://192.168.1.4:3333/users${query}`)
    .then(function (response) {
      // console.log(
      //   `http://192.168.1.4:3333/users${query}`,
      //   'deletereques, ',
      //   response,
      // );
      // const res = response.data;
      // return res;
    })
    .catch(function (error) {
      console.log(error, 'delet');
      return 'error';
    });
};

export const createUser = query => {
  console.log(query, 'query');
  axios
    .post(`http://192.168.1.4:3333/users/`, query[0].data)
    .then(function (response) {
      console.log(
        `http://192.168.1.4:3333/users${query}`,
        'deletereques, ',
        response,
      );
    })
    .catch(function (error) {
      console.log(error, 'delet');
      return 'error';
    });
};

export const updateData = query => {
  console.log(query[0].data, 'query', `http://192.168.1.4:3333/users/${query[1].id}`);
  axios
    .put(`http://192.168.1.4:3333/users/${query[1].id}`, query[0].data)
    .then(function (response) {
      console.log(
        `http://192.168.1.4:3333/users${query}`,
        'deletereques, ',
        response,
      );
    })
    .catch(function (error) {
      console.log(error, 'delet');
      return 'error';
    });
};
