export default {
  API_ENDPOINT: `${process.env.NODE_ENV == 'development' ? 'http://localhost:9000' : ''}/.netlify/functions`,
}