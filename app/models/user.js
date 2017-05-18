// import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  bugs: DS.hasMany('bug', {inverse: 'creator'}),
  name: DS.attr('string'),
  role: DS.attr('string'),
  email: DS.attr('string')
});
