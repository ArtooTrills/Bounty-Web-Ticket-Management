import Route from '@ember/routing/route';

export default Route.extend({
	model() {
    return [{
      dept_id: 'Allegis2014',
      dept_name: 'Application Development',
      manager: 'A. Goyal',
      city: 'Bangalore',
      technology: '.NET',
      image: '../assets/images/T1.jpg',
      
    }, {
      dept_id: 'Allegis2008',
      dept_name: 'Logistics',
      manager: 'B. Nair',
      city: 'Hyderabad',
      technology: 'Java',
      image: '../assets/images/T2.jpg',
      
    }, {
      dept_id: 'Allegis4007',
      dept_name: 'Mobile Development',
      manager: 'C. Raj',
      city: 'Chennai',
      technology: 'Xamarin',
      image: '../assets/images/T3.jpg',
      
    }];
  }
});
