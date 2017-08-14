'use strict';

var setting_production_dir = 'client/production';
var setting_development_dir = 'client/development';

module.exports = {
  development_dir: setting_development_dir,
  production_dir: setting_production_dir,
  development_copy_folder: [setting_development_dir + '/font', setting_development_dir + '/img'],
  core: {
    file_settings: [{
      file_type: 'js',
      compress: ['js/lib/angular.min.js', 'js/lib', 'js/app/core/core.js', 'js/app/core'],
      compress_to: 'js/lib.min.js'
    }, {
      file_type: 'css',
      compress: ['css/lib', 'css/app'],
      compress_to: 'css/lib.min.css'
    }]
  },
  views: {
    login: {
      file_settings: [{
        file_type: 'js',
        compress: ['js/app/login'],
        compress_to: 'js/login.min.js'
      }]
    },

    register: {
      file_settings: [{
        file_type: 'js',
        compress: ['js/app/register'],
        compress_to: 'js/register.min.js'
      }]
    },

    index: {
      file_settings: [{
        file_type: 'js',
        compress: ['js/app/ticket'],
        compress_to: 'js/ticketMain.min.js'
      }]
    }
  }
};
