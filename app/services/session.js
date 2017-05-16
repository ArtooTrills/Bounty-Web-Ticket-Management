import Ember from 'ember';
import ESASession from "ember-simple-auth/services/session";
// import RSVP from 'rsvp';

const { inject: { service }, isEmpty } = Ember;

export default ESASession.extend({

  store: service(),

  load() {
    let userId = this.get('data.authenticated.user.id');
    if (!isEmpty(userId)) {
      return this.get('store').findRecord('user', userId).then((user) => {
        this.set('currentUser', user);
      });
    } else {
      return Ember.RSVP.resolve();
    }
  },

  // currentUser: Ember.computed('isAuthenticated', function() {
  //   if (this.get('isAuthenticated')) {
  //     //load the user with id, our mock server returns id.
  //     // const promise = $.getJSON('/users/current');
  //     let userId = this.get('data.authenticated.user.id');
  //     const promise = this.get('store').findRecord('user', userId);
  //     return DS.PromiseObject.create({
  //       promise: promise
  //     })
  //   }
  // }),

  userIsAdmin: Ember.computed('isAuthenticated', 'currentUser.role', function() {
    return (this.get('currentUser.role') === 'admin') ? true : false;
  }),

  userIsProductEngineer: Ember.computed('isAuthenticated', 'currentUser.role', function() {
    return (this.get('currentUser.role') === 'product_engineer') ? true : false;
  }),

  userIsSupportEngineer: Ember.computed('isAuthenticated', 'currentUser.role', function() {
    return (this.get('currentUser.role') === 'support_engineer') ? true : false;
  }),

});
