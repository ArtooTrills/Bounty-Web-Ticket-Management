import Ember from 'ember';
import RSVP from 'rsvp';

const {
  inject: {
    service
  }
} = Ember;
export default Ember.Route.extend({
  session: service(),
  bugService: service('bugs'), //use bugs service for managing bug crud operations instead of conventional routes (makes resusing model crud logic easier within components)

  model() {
    return RSVP.hash({
      bug: this.store.createRecord('bug', {
        owner: this.get('session.currentUser'),
        creator: this.get('session.currentUser'),
      }),
      owners: this.store.findAll('user')
    });
  },

  actions: {
    onCreate( /*bug*/ ) {
      //transition to bugs route.
      this.transitionTo('bugs'); //this currently doesn't force reload the models in an RSVP hash.
    },

    onCancel() {
      this.transitionTo('bugs');
    },


  }, //end actions

  resetController: function(controller, isExiting /*, transition*/ ) {
    if (isExiting) {
      //grab the model from the controller
      let bug = controller.get('model.bug');
      // we verify if the model is in 'isNew' state, which means the model wasn't saved to the backend
      if (bug.get('isNew')) {
        //we destroy the record from store
        bug.destroyRecord();
        console.info('destroyed unsaved bug');
      }
    }
  }
});
