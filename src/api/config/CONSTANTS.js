module.exports =  {
  HEADERS: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Max-Age': '2592000',
    'Access-Control-Allow-Credentials': 'true',
  },
  DATABASE_AUTH: "mongodb+srv://lucas-admin:12345@cluster0-15rhl.mongodb.net/test?retryWrites=true&w=majority",
}