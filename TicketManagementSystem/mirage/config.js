export default function() {
  this.namespace = '/api';

  this.get('/Engineers', function() {
    return {
      data: [{
        dept_id: 'Allegis2014',
        attributes: {
          department: 'Application Development',
          technology: '.NET',
          city: 'Bangalore',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
        }
      }, {
        dept_id: 'Allegis2008',
        attributes: {
          department: 'Logistics',
          technology: 'Java',
          city: 'Hyderabad',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
        }
      }, {
        dept_id: 'Allegis4007',
        attributes: {
          department: 'Mobile Development',
          technology: 'Xamarin',
          city: 'Chennai',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
        }
      }]
    };
  });
}
