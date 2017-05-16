import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  // only admins can create an user
  canCreate: Ember.computed('session.userIsAdmin', function() {
    return this.get('session.userIsAdmin');
  }),

});
