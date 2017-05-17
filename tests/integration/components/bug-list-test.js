import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/start-mirage';

moduleForComponent('bug-list', 'Integration | Component | bug list', {
  integration: true,
  setup() {
    startMirage(this.container);
  },
  afterEach() {
    server.shutdown();
  },
});

test('it should display "No bugs!" when bug list is empty', function(assert) {

  const bugs = server.createList('bug', 0);
  this.set('bugs', bugs);
  this.render(hbs `{{bug-list bugs=bugs}}`);

  assert.equal(this.$().text().trim(), 'No bugs!');

});

test('it should list all bugs when bugs list is not empty', function(assert) {

  const bugs = server.createList('bug', 2);
  this.set('bugs', bugs);
  this.render(hbs `{{bug-list bugs=bugs}}`);

  assert.equal(this.$('.ui.segment').length, 2, 'Bug rows are displayed!');

});

test('Bug row should be in disabled state when a bug is resolved', function(assert) {
  assert.expect(2);
  const bugs = server.createList('bug', 2, {
    resolved: true
  });
  this.set('bugs', bugs);
  this.render(hbs `{{bug-list bugs=bugs}}`);

  assert.equal(this.$('.ui.segment:first').hasClass('disabled'), true, 'Row is displayed in a disabled segment!');
  assert.equal(this.$('.ui.segment:last').hasClass('disabled'), true, 'Row is displayed in a disabled segment!');

});
