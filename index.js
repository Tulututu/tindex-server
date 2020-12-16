const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/index');
const { DB_URL, SERVER_PORT } = config;

// mongoose
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

//Routes
const userLoginRouter = require('./routes/api/user_ management/user_login');
const userLogOutRouter = require('./routes/api/user_ management/user_logout');
const userAuthRouter = require('./routes/api/user_ management/user_auth');
const userUploadImage = require('./routes/api/user_ management/user_uploadImage');
const updateUserInfo = require('./routes/api/user_ management/user_update_info');
const loadUserCards = require('./routes/api/contents/user_cards');

// Middle-ware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//set-static
app.use('/uploads', express.static('uploads'));

// user-managment-API-Router
app.use('/api/users/login', userLoginRouter);
app.use('/api/users/logout', userLogOutRouter);
app.use('/api/users/auth', userAuthRouter);
app.use('/api/users/upload', userUploadImage);
app.use('/api/users/updateinfo', updateUserInfo);
app.use('/api/user_cards', loadUserCards);

app.listen(SERVER_PORT, () => {
  console.log(`Server on port ${SERVER_PORT}`);
});
