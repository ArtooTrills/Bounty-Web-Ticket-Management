import Ember from 'ember';
// import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  model(/*params*/) {
    // let currentUser = this.get('session.currentUser');
    // Note: due to model reloading issues with RSVP.hash, and since this data is from stubbed api, bug filtering is handled in the bug-list component as opposed to querying in route
    // return RSVP.hash({
    //   bugs: this.store.findAll('bug', {
    //     include: 'owner, creator'
    //   }),
    //   owners: this.store.findAll('user'),
    // });
    // the real query should be something like this
    // return this.store.query('bug', { filter: { owner: currentUser, creator: currentUser } });
    return this.store.findAll('bug', {
      include: 'owner, creator'
    });

  },

  actions: {
    onBugRemoval() {
      this.transitionTo('bugs');
    }
  }
});
