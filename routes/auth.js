const Users = require('../controllers/auth');
module.exports = (router) => {
  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);
}