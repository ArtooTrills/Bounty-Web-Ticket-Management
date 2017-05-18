import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i){
    return `Bug ${i+1}`;
  },
  description: "This is supposed to be a real bug description that is useful in solving the issue. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  priority: 1,
});
