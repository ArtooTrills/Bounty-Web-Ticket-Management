import Route from '@ember/routing/route';

export default Route.extend({
	model() {
    return [{
      id: 'SupportEngg-4686',
	  name:'Pappachi Mol',
      platform: 'Android',
      manager: 'Arohi Kapoor',
      project: 'Parexel',
	  notice:'1 month',
      image: '../assets/images/4.jpg',
      
    }, {
     id: 'ProductEngg-4687',
	  name:'Kemal Ataturk',
      platform: 'ios',
      manager: 'Akira Sehgal',
      project: 'Parexel',
	  notice:'1 month',
      image: '../assets/images/5.jpg',
      
    }, {
      id: 'ProductEngg-4688',
	  name:'Vijay Sen',
      platform: 'Windows',
      manager: 'Ankur Khan',
      project: 'Parexel',
	  notice:'1 month',
      image: '../assets/images/6.jpg',
      
    }];
  }
});
