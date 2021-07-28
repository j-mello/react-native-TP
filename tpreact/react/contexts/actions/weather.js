import request from '../../utils/request';

export const getWeathers = page =>
  request('http://localhost:3000/weathers?perPage=10&page=' + page);

export const addWeather = item =>
  request('http://localhost:3000/weathers', {
    method: 'POST',
    body: item,
  });

export const editWeather = item =>
  request('http://localhost:3000/weathers/' + item._id, {
    method: 'PUT',
    body: item,
  });

export const deleteWeather = item =>
  request('http://localhost:3000/weathers/' + item._id, {
    method: 'DELETE',
  });
