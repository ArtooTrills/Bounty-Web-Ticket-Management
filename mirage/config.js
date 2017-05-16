import Mirage from 'ember-cli-mirage';
export default function() {

  //parses a query string and returns an object
  let parseQuery = function(qstr) {
    var query = {};
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
  };
  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  // this.namespace = 'api';
  // this.timing = 400; //simulate network delay


  this.get('/bugs');

  this.post('/bugs', (schema, request) => {
    let params = JSON.parse(request.requestBody);
    return schema.bugs.create(params);
  });
  this.get('/bugs/:id');
  this.patch('/bugs/:id');
  this.del('/bugs/:id');
  this.get('/users');
  this.post('/users');
  this.get('/users/:id');
  this.del('/users/:id');
  this.patch('/users/:id');
  // this.get('/users/:id/bugs', function(schema, request) {
  //   let ownerId = request.params.id;
  //   return schema.bugs.where({
  //     ownerId: ownerId
  //   });
  // });

  //mock token api responses to mimic user roles
  this.post('/token', (schema, request) => {
    var rb = parseQuery(request.requestBody);
    // console.log(parseQuery(request.requestBody));
    if (rb.username === 'admin@artoo.com' && rb.password === 'secret') {
      return {
        user: {
          id: 1,
          name: 'Artoo Admino',
          role: 'admin'
        },
        access_token: "PA$$WORD_ADMIN"
      };
    } else if (rb.username === 'product_engineer@artoo.com' && rb.password === 'secret') {
      return {
        user: {
          id: 2,
          name: 'Artoo Producto',
          role: 'product_engineer'
        },
        access_token: "PA$$WORD_PRODUCT"
      };
    } else {
      return {
        user: {
          id: 3,
          name: 'Artoo Supporto',
          role: 'support_engineer'
        },
        access_token: "PA$$WORD_SUPPORT"
      };
    }
    //TODO Handle error when user is not found or for invalid credentials

  });

  this.get('/users/current', (schema, request) => {
    if (request.requestHeaders.Authorization === "Bearer PA$$WORD_ADMIN") {
      return {
        user: {
          id: 1,
          name: 'Artoo Admino',
          role: 'admin'
        }
      };
    } else {
      return new Mirage.Response(401, {}, {});
    }
  });
}
