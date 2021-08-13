import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt)

  router.post('/api/user/login', controller.user.login);
  router.post('/api/admin', jwt, controller.user.index);
  router.post('/api/user/register', controller.user.register);
  router.get('/api/basic/info', controller.basic.info);
  router.get('/api', controller.home.index);
  router.get('/api/user', controller.home.getUser);
  router.get('/api/users', controller.home.getUsers);
  // router.put('/api/user', controller.home.updateUser);
  // router.post('/api/user', controller.home.addUser);
  // router.delete('/api/user', controller.home.deleteUser);
  router.get('/api/testStaticMethods', controller.home.testStaticMethods);
  router.get('/api/testInstanceFunction', controller.home.testInstanceFunction);
};