import axios from 'axios';

const API_KEY = 'rDOImWP92OhwALKRHVgt-1i4yDIIm4a7QmhiQ4wrRkY';
const BASE_URL = 'https://api.unsplash.com/';

const unsplashAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
});

async function fetchPhotoSearch(query, page) {
  const response = await unsplashAPI.get('search/photos/', {
    params: { query, page, per_page: 20 },
  });

  return response.data;
}

export default fetchPhotoSearch;