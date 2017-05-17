import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/start-mirage';

moduleForComponent('bug-view', 'Integration | Component | bug view', {
  integration: true,
  setup() {
    startMirage(this.container);
  },
  afterEach() {
    server.shutdown();
  },
});

test('it renders bug details and owners in dropdown', function(assert) {
  assert.expect(4);

  const owners = server.createList('user', 3, {
    role: 'product_engineer'
  }); //get all owners as product engineers
  const bug = server.create('bug', {
    title: 'A Bug',
    description: 'Bug description'
  });

  this.set('owners', owners);
  this.set('bug', bug);

  this.render(hbs `{{bug-view bug=bug owners=owners}}`);

  // check title is displayed in the text field
  const $titleInput = this.$('#bv_bug_title');
  assert.equal($titleInput.val(), bug.title, 'Title should be present');

  // check description is displayed in the textarea
  const $descriptionInput = this.$('.description');
  assert.equal($descriptionInput.val().trim(), bug.description, 'Description should be present');

  // check owners are listed in the dropdown
  const $ownerDropdown = this.$('.owner.dropdown');
  assert.equal($ownerDropdown.find('.item:eq(0)').text().trim(), (owners[0].name + ' ' + owners[0].role), 'Dropdown Item should be present');
  assert.equal($ownerDropdown.find('.item:eq(1)').text().trim(), (owners[1].name + ' ' + owners[1].role), 'Dropdown Item should be present');


});
