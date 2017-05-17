import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('bug', 'Unit | Model | bug', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('should belong to a owner', function(assert) {
  const Bug = this.store().modelFor('bug');
  const relationship = Ember.get(Bug, 'relationshipsByName').get('owner');

  assert.equal(relationship.key, 'owner', 'has relationship with owner');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('should belong to a creator', function(assert) {
  const Bug = this.store().modelFor('bug');
  const relationship = Ember.get(Bug, 'relationshipsByName').get('creator');

  assert.equal(relationship.key, 'creator', 'has relationship with creator');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
