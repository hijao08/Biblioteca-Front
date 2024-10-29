import axios from 'axios';

const API_URL = 'http://127.0.0.1:8001/api/livros/';

export const fetchLivros = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
