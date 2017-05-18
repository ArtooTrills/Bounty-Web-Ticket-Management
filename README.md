# Artoo BTMS

Artoo BTMS (Bug Tracker Management System) is an application designed for capturing bugs/tickets by Product Engineers and Support Engineers.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd btms`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying to Surge

```sh
ember surge
```

The above command will build this app using the production environment then deploy that code to the url `<your-project-name>.surge.sh`

By passing an environment flag `ember surge --environment development` to the ember surge command will use your development environment.

#### Updating the Surge Domain Name

The default domain name for your project is the `<your-app-name.surge.sh>`. This can befound in the `CNAME` file at the root of your project.  
Use `ember generate surge-domain <your-new-domain>` to update the domain which will update the `CNAME` file. Remember the domain name needs to be unique.

For more info check out [Surge Docs](http://surge.sh/help/remembering-a-domain)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
