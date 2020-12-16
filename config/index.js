const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_URL: process.env.DB_URL,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
};
