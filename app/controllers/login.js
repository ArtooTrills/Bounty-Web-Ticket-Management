import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let self = this;
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password)
      .then((/*session*/)=>{
        self.transitionToRoute('index');
        setTimeout(function(){ window.location.href = window.location.href; }, 300);
      })
      .catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
