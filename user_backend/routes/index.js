const UserController = require('./user')
const ApiOutputRenderer = require('./api_output_renderer')
const AuthController = require('./auth');

module.exports = function(app){
  app.post('/api/user/register', UserController.findUserByEmail, UserController.createuser, ApiOutputRenderer.render, ApiOutputRenderer.renderError)
  app.post('/api/user/login', AuthController.authenticate);
  app.get('/api/user/get', AuthController.verifyUser, UserController.getuser, ApiOutputRenderer.render, ApiOutputRenderer.renderError);
  app.put('/api/user/update', AuthController.verifyUser, UserController.updateUser, ApiOutputRenderer.render, ApiOutputRenderer.renderError);
  app.delete('/api/user/delete', AuthController.verifyUser, UserController.deleteUser, ApiOutputRenderer.render, ApiOutputRenderer.renderError);
}