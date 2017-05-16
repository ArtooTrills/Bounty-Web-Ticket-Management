import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  init() {
    this._super(...arguments);
  },

  // Bugs

  // creates a new bug under the given owner and resolves with the saved bug
  // requires bug properties object and ownerId
  saveBugUnderOwner(bug, ownerId) {
    let store = this.get('store'),
      currentUser = this.get('session.currentUser');

    return new RSVP.Promise((resolve) => {
      store.findRecord('user', ownerId).then(owner => {
        bug.owner = owner;
        bug.creator = currentUser;
        //save the bug and resolve with the saved bug
        bug.save().then(savedBug => {
          resolve(savedBug);
        });
      });
    });
  },

  //sets the bug owner and resolves with the saved bug
  setBugOwner(bug, ownerId) {
    let store = this.get('store');
    return new RSVP.Promise((resolve) => {
      store.findRecord('user', ownerId).then(owner => {
        bug.owner = owner;
        //save the bug and resolve with the saved bug
        bug.save().then(savedBug => {
          resolve(savedBug);
        });
      });
    });
  },

  // toggles the resolved property and resolves with the saved bug
  // requires bug model to be sent
  resolveOrRevertBug(bug) {
    return new RSVP.Promise((resolve) => {
      bug.toggleProperty('resolved');
      bug.save().then(savedBug => resolve(savedBug));
    });
  },

  // deletes a given bug and resolves with the deleted bug's id
  deleteBug(bug) {
    let bugId = bug.get('id');
    return new RSVP.Promise((resolve) => {
      bug.destroyRecord().then(() => resolve(bugId));
    });
  },







});
