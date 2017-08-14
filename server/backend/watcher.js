'use strict';

var watchPaths = require(app_settings.watchConf);
var fs = require('fs');
var path = require('path');

function watcher(app) {
  if (app.get('env') === 'development') {

    //TODO: Throw error if no watchPaths
    watchPaths.forEach(function(watchPath, watchFileindex) {
      fs.readdir(watchPath, function(err, watchFiles) {
        if (err)
          throw err;

        console.log('\n Watching for changes: ');
        watchFiles.forEach(function(file, index) {
          console.log('\t ' + watchPaths[watchFileindex] + '/' + file);

          fs.watch(watchPaths[watchFileindex] + '/' + file, function(event, filename) {
            if (event !== 'change') return;
            if (filename) {
              process.exit(0);
            }
          });
        });

      });
    });

  } else {
    console.log('Not in "Devleopment" mode. No files changes being watched!');
  }
}

module.exports = {
  watch: watcher
};
