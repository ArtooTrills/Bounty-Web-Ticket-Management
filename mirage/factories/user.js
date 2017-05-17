import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.list.cycle('Admino','Producto','Supporto'),
  role: faker.list.cycle('admin','product_engineer','support_engineer'),
  email: faker.list.cycle('admin@artoo.com', 'product_engineer@artoo.com', 'support_engineer@artoo.com')
});
