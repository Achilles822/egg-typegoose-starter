import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt)

  router.post('/admin/login', controller.user.login);
  router.post('/admin', jwt, controller.user.index);
  router.get('/', controller.home.index);
  router.get('/user', controller.home.getUser);
  router.get('/users', controller.home.getUsers);
  router.put('/user', controller.home.updateUser);
  router.post('/user', controller.home.addUser);
  router.delete('/user', controller.home.deleteUser);
  router.get('/testStaticMethods', controller.home.testStaticMethods);
  router.get('/testInstanceFunction', controller.home.testInstanceFunction);
};