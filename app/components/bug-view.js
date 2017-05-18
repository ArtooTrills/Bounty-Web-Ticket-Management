import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  bugService: Ember.inject.service('bugs'),
  bug: null, //passed in
  owners: null, //passed in
  filteredOwners: Ember.computed('owners', 'session.currentUser.role', {
    get() {
      let owners = this.get('owners'),
        filteredOwners = [],
        cur = this.get('session.currentUser.role');
      if (cur === 'product_engineer') {
        // a product engineer can't assign bugs to anyone
        filteredOwners = owners.filterBy('id', this.get('session.currentUser.id'));
      } else if (cur === 'support_engineer') {
        // a support engineer can assign bugs to other support engineers and product engineers but not admin.
        filteredOwners = owners.rejectBy('role', 'admin');
      } else {
        // an admin got access to all roles but him.
        filteredOwners = owners.rejectBy('role', 'admin');
      }
      return filteredOwners;
    }
  }),
  actions: {

    setOwner(owner) {
      console.log(owner.get('name'));
      let bug = this.get('bug');
      // bug.owner = owner;
      if (bug.get('isNew')) {
        // just set
        bug.set('owner', owner);
      } else {
        //set and save
        this.get('bugService').setBugOwner(bug, owner.id).then(( /*savedBug*/ ) => {
          console.log('Bug Saved Successfully!');
        });
      }
    },
    createBug(bug) {

      let ownerId = bug.get('owner.id');

      this.get('bugService').saveBugUnderOwner(bug, ownerId).then(savedBug => {
        console.log('Bug Saved Successfully!');
        this.sendAction('onCreate', savedBug);
      });

    },
    updateBug(bug) {
      if (this.get('bug.hasDirtyAttributes')) {
        bug.save(); // TODO Move save logic to service
      }
    },

    cancel() {
      this.sendAction('onCancel');
    },




  }
});
