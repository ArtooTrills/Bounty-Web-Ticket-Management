import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  resolved: DS.attr('boolean', {
    defaultValue: false
  }),
  owner: DS.belongsTo('user', {
    async: true
  }),
  creator: DS.belongsTo('user', {
    async: true
  }),
  createdById: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string', {
    defaultValue: ''
  }),
  priority: DS.attr('number', {
    defaultValue: 1
  }),
  priorityString: Ember.computed('priority', {
    get() {
      let p = parseInt(this.get('priority')),
        ps = '';
      if (p === 1) {
        ps = 'Low';
      } else if (p === 2) {
        ps = 'Medium';
      } else if (p === 3) {
        ps = 'High';
      }
      return ps;
    }
  }),
  priorityColor: Ember.computed('priority', {
    get() {
      let p = parseInt(this.get('priority')),
        pc = '';
      if (p === 1) {
        pc = 'grey';
      } else if (p === 2) {
        pc = 'orange';
      } else if (p === 3) {
        pc = 'red';
      }
      return pc;
    }
  }),
});
