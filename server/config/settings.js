'use strict';

module.exports = {
  applicationName: 'Bounty-Web-Ticket-Management',

  // Configs
  expressConf: './server/config/express',
  viewConf: './server/config/views',
  routeConf: './server/config/routes',
  databaseConf: './server/config/database',
  compressionConf: '../config/peformance_tuning',
  passportConf: './server/config/passport',
  watchConf: '../config/watch',

  // Backend
  passport: './server/backend/passport',
  errorHandler: '../backend/handleRouteErrors',
  serverFunctions: './server/backend/./server',
  compressionLogic: './server/backend/compressJSCSS',
  authentication: '../backend/authentication',
  watcher: './server/backend/watcher',

  // Controller
  controllerTicket: '../controller/ticket',
  controllerUser: '../controller/user',

  // Model
  modelTicket: '../model/ticket',
  modelUser: '../model/user',

  // Client-side
  publicFolder: 'client/public',

  // Pages
  indexPage: '/index',
  loginPage: '/login',
  registrationPage: '/register',
  usersPage: '/users'
}
