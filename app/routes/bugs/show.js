import Ember from 'ember';
import RSVP from 'rsvp';

const {
  inject: {
    service
  }
} = Ember;
export default Ember.Route.extend({
  bugService: service('bugs'), //use bugs service for managing bug crud operations instead of conventional routes (makes resusing model crud logic easier within components)

  model(params) {
    return RSVP.hash({
      bug: this.store.findRecord('bug', params.bug_id),
      owners: this.store.findAll('user')
    });
  },

  actions: {
    onUpdate( /*bug*/ ) {
      this.transitionTo('bugs');
    },

    onCancel() {
      this.transitionTo('bugs');
    },

  }, //end actions

  resetController: function(controller, isExiting /*, transition*/ ) {
    if (isExiting) {
      console.log('isExiting');
      //grab the model from the controller
      let bug = controller.get('model.bug');
      // we verify if the model has dirty attributes
      if (bug.get('hasDirtyAttributes')) {
        //rollback attributes
        bug.rollbackAttributes();
        console.info('rolling back attributes');
      }
    }
  }
});
