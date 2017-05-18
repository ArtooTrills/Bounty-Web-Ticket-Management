import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  // only use models to define relationships. Attributes are specified in factories.
  owner: belongsTo('user'),
  creator: belongsTo('user'),
});
