import Ember from 'ember';
const {
  // get,
  inject: {
    service
  }
} = Ember;
export default Ember.Controller.extend({
  session: service('session'),

  actions: {
    invalidateSession() {
      let self = this;
      this.get('session').invalidate().then((/*session*/)=>{
        self.transitionToRoute('index');
      });
    }
  }
});
