import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('bugs', function() {
    this.route('new');
    this.route('show', {
      path: ':bug_id'
    });
  });
  this.route('login');
  this.route('users');
});

export default Router;
