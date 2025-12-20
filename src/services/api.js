import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getMovies = () => api.get('/movies');

export const deleteMovie = (id) => api.delete(`/movies/${id}`);

export const addMovie = (movieData) => api.post('/movies', movieData);

export default api;