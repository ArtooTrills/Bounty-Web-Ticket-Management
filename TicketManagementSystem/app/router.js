import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('ProductEngineers');
  this.route('SupportEngineers');
  this.route('Engineers');
  this.route('tickets');
});

export default Router;
