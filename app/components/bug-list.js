import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  sesion: service(),
  bugService: service('bugs'), //use bugs service for managing bug crud operations instead of conventional routes (makes resusing model crud logic easier within components)
  bugs: null, //passed in
  // bugOwners: null, //passed in
  currentUser: null, //passed in

  //workaround
  filteredBugs: Ember.computed(function() {
    const cuid = this.get('currentUser.id');
    let bugs = this.get('bugs');
    return bugs.filter(function(b) {
      //return bugs that are created by or owned by the current user
      return b.get('owner.id') === cuid || b.get('creator.id') === cuid;
    });
  }),

  actions: {
    resolveOrRevert(bug) {
      this.get('bugService').resolveOrRevertBug(bug).then(() => {
        // do something with the saved bug
      });
    },
    deleteBug(bug) {
      this.get('bugService').deleteBug(bug).then(() => {
        this.sendAction('onBugRemoval'); //TODO use router service to transition once it arrives in Ember
      });
    }

  }
});
