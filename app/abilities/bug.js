import Ember from 'ember';
import {
  Ability
} from 'ember-can';

export default Ability.extend({
  // only admins can create an user
  canCreate: Ember.computed('session.userIsAdmin', function() {
    return !this.get('session.userIsAdmin');
  }),

  canEdit: Ember.computed('model.owner', 'session.userIsSupportEngineer', function() {
    let isSE = this.get('session.userIsSupportEngineer'),
      isOwner = this.get('session.currentUser') === this.get('model.owner');
    //support engineer can edit all bugs
    //product engineer can only edit bugs owned by him
    //admin cannot view bugs
    return (isOwner || isSE) ? true : false;
  }),

});
