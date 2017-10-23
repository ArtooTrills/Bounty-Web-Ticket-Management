import Route from '@ember/routing/route';

export default Route.extend({
	model() {
    return [{
      id: 'ProductEngg-2686',
	  name:'Alekh Raj',
      platform: 'Android',
      manager: 'Solman Deka',
      project: 'Parexel',
	  notice:'1 month',
      image: '../assets/images/1.jpg',
      
    }, {
     id: 'ProductEngg-2687',
	  name:'Beka Doo',
      platform: 'ios',
      manager: 'Anu Mishra',
      project: 'Parexel',
	  notice:'1 month',
      image: '../assets/images/2.jpg',
      
    }, {
      id: 'ProductEngg-2688',
	  name:'Chang Lee',
      platform: 'Windows',
      manager: 'Jayashree B.',
      project: 'Parexel',
	  notice:'1 month',
      image: '../assets/images/3.jpg',
      
    }];
  }
});
