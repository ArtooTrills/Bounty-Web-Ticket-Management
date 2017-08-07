'use strict';

var fs = require('fs');
var path = require('path')
var compressJSCSS = require('node-minify');

var compression_settings = require(app_settings.compressionConf);
var duplicateFileDetect = [];

function fileExistsSync(filePath) {
  try {
    fs.statSync(filePath);
  } catch (err) {
    if (err.code == 'ENOENT') return false;
  }
  return true;
}

function extend(obj, src) {
  Object.keys(src).forEach(function(key) {
    obj[key] = src[key];
  });
  return obj;
}

function unique(arr) {
  var n = [];
  for (var i = 0; i < arr.length; i++) {
    if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
  }
  return n;
}

function mkdirRecursive(path, root) {

  var dirs = path.split('/'),
    dir = dirs.shift(),
    root = (root || '') + dir + '/';

  try {
    fs.mkdirSync(root);
  } catch (e) {
    //dir wasn't made, something went wrong
    if (!fs.statSync(root).isDirectory()) throw new Error(e);
  }

  return !dirs.length || mkdirRecursive(dirs.join('/'), root);
}


function rmdir(dir) {
  if (fileExistsSync(dir)) {
    var list = fs.readdirSync(dir);
    for (var i = 0; i < list.length; i++) {
      var filename = path.join(dir, list[i]);
      var stat = fs.statSync(filename);

      if (filename == "." || filename == "..") {
        // pass these files
      } else if (stat.isDirectory()) {
        // rmdir recursively
        rmdir(filename);
      } else {
        // rm fiilename
        fs.unlinkSync(filename);
      }
    }
    fs.rmdirSync(dir);
  }
}

function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync() {
  var targetFolder = compression_settings.production_dir + '/' + path.basename(compression_settings.development_copy_folder);
  var sources = compression_settings.development_copy_folder;
  var files = [];

  if (Object.prototype.toString.call(sources) !== '[object Array]') {
    sources = [sources]
  }

  sources.forEach(function(source) {
    if (fileExistsSync(source)) {
      if (fs.lstatSync(source).isDirectory()) {
        var files = fs.readdirSync(source);

        if (files.length > 0) {
          //check if folder needs to be created or integrated
          if (!fs.existsSync(targetFolder)) {
            mkdirRecursive(targetFolder);
          }
        }

        files.forEach(function(file) {
          var curSource = path.join(source, file);
          if (fs.lstatSync(curSource).isDirectory()) {
            copyFolderRecursiveSync(curSource, targetFolder);
          } else {
            copyFileSync(curSource, targetFolder);
          }
        });

      } else {
        copyFileSync(source, targetFolder);
      }
    }
  });
}

function verifyUnique(check) {
  var isUnique = false;

  if (duplicateFileDetect.indexOf(check) == -1)
    isUnique = true;
  else
    isUnique = false;

  duplicateFileDetect.push(check);

  return isUnique;
}

function getFiles(setting, path, stripPath) {
  var files_or_directories = setting.compress;
  setting.files = [];

  var walk = function(files_or_directories) {
    var objectType = Object.prototype.toString.call(files_or_directories);

    if (objectType !== '[object Array]')
      files_or_directories = [files_or_directories];

    files_or_directories.some(function(file) {
      var pathAndfile = path + '/' + file;
      var fileStat = fs.statSync(pathAndfile);

      if (fileStat.isDirectory()) {
        var file_list = fs.readdirSync(pathAndfile)

      } else {
        file = (stripPath) ? pathAndfile.replace(path + '/', '') : pathAndfile;
        if (verifyUnique(file))
          setting.files.push(file);
        var file_list = [];
      }

      var i = 0;

      (function next() {
        var file = file_list[i++];

        if (!file)
          return;

        file = pathAndfile + '/' + file;

        var stat = fs.statSync(file)

        if (stat && stat.isDirectory()) {
          walk(file);
          next();

        } else {
          file = (stripPath) ? file.replace(path + '/', '') : file;
          if (verifyUnique(file))
            setting.files.push(file);
          next();
        }
      })();
    });
  }

  walk(files_or_directories);
  return setting;
}

function parseSettings(settings, stripPath) {
  var results = {};
  var view_settings = extend({}, settings.views); // Clone

  view_settings = extend(view_settings, {
    core: settings.core
  });
  results.parsed = [];
  results.viewNames = [];

  Object.keys(view_settings).forEach(function(view) {
    view_settings[view].file_settings.forEach(function(value) {
      value.view = view;
      if (results.viewNames.indexOf(view) === -1) {
        results.viewNames.push(view);
      }
      results.parsed.push(getFiles(value, settings.development_dir.replace(/\/$/, ''), stripPath));
    });
  });

  return results;
}

function nocompress(callback) {
  var viewSettings = {};

  // Return files in direcotries and views
  var results = parseSettings(compression_settings, true);

  // Initialize views
  for (var x = 0; x < results.viewNames.length; x++) {
    viewSettings[results.viewNames[x]] = {};
    viewSettings[results.viewNames[x]].css = [];
    viewSettings[results.viewNames[x]].javascript = [];
    viewSettings.publicFolder = compression_settings.development_dir;
  }

  // Create one object:
  //   1) To build the js and css in each view
  results.parsed.forEach(function(parsedSetting) {
    var view = viewSettings[parsedSetting.view];

    switch (parsedSetting.file_type) {
      case 'js':
        view.javascript = view.javascript.concat(parsedSetting.files);
        break;

      case 'css':
        view.css = view.css.concat(parsedSetting.files);
        break;
    }
  });

  // Build Jade script and css code (merge shared js and css with js in view)
  Object.keys(viewSettings).forEach(function(view) {
    if (view !== 'core' && Object.prototype.toString.call(viewSettings[view]) === '[object Object]') {
      var view = viewSettings[view];
      view.css = viewSettings.core.css.concat(view.css);
      view.javascript = viewSettings.core.javascript.concat(view.javascript);
    }
  });

  console.log('\n************************************************');
  console.log('Compression disabled in development environment!');
  console.log('************************************************\n');
  callback(viewSettings);
}

function compress(callback) {
  var total = 0;
  var count = 0;
  var tempPath = '/tmp/';
  var compressable = {
    comppression_type: {
      js: 'uglifyjs', //uglifyjs or no-compress. gcc is broken
      css: 'sqwish' //sqwish or no-compress
    },
    tempPath: tempPath,
    views: {}
  };
  var viewSettings = {};

  // Return files in direcotries and views
  var results = parseSettings(compression_settings, false);

  // Initialize views
  for (var x = 0; x < results.viewNames.length; x++) {
    var view = compressable.views[results.viewNames[x]] = {}
    view.js = {};
    view.js.files = [];
    view.css = {};
    view.css.files = [];

    viewSettings[results.viewNames[x]] = {};
    viewSettings[results.viewNames[x]].css = [];
    viewSettings[results.viewNames[x]].javascript = [];
    viewSettings.publicFolder = compression_settings.production_dir;
  }

  // Create two obects:
  //   1) to be used for comppression settings,
  //   2) the other will be used to build the js and css in each view
  results.parsed.forEach(function(parsedSetting) {
    var view = compressable.views[parsedSetting.view];
    var view2 = viewSettings[parsedSetting.view];


    switch (parsedSetting.file_type) {
      case 'js':
        view.js.compress_to = view.js.files.concat(parsedSetting.compress_to);
        view.js.files = view.js.files.concat(parsedSetting.files);
        view2.javascript = view2.javascript.concat(parsedSetting.compress_to);
        break;

      case 'css':
        view.css.compress_to = view.css.files.concat(parsedSetting.compress_to);
        view.css.files = view.css.files.concat(parsedSetting.files);
        view2.css = view2.css.concat(parsedSetting.compress_to);
        break;
    }

    total++;
  });

  // Build Jade script and css code (merge shared js and css with js in view)
  Object.keys(viewSettings).forEach(function(view) {
    if (view !== 'core' && Object.prototype.toString.call(viewSettings[view]) === '[object Object]') {
      var view = viewSettings[view];
      view.css = viewSettings.core.css.concat(view.css);
      view.javascript = viewSettings.core.javascript.concat(view.javascript);
    }
  });

  // Remove production directory before recreating
  rmdir(compression_settings.production_dir);

  // Copy misc folders needed in the prouduction directory
  copyFolderRecursiveSync(compression_settings);

  // Perform comppression
  var viewKeys = Object.keys(compressable.views);
  var fileTypes = Object.keys(view);

  (function() {
    viewKeys.forEach(function(viewName, loopNum) {
      var view = compressable.views[viewName];

      fileTypes.forEach(function(fileType) {
        var files = view[fileType].files;

        if (files.length > 0) {

          new compressJSCSS.minify({
            type: compressable.comppression_type[fileType],
            fileIn: view[fileType].files,
            fileOut: compression_settings.production_dir + '/' + view[fileType].compress_to,
            tempPath: tempPath,
            //sync: true,
            callback: function(err) {
              count++;
              console.log('Tuning: ');
              view[fileType].files.forEach(function(file) {
                console.log('\t' + file);
              });

              console.log("\t Complete!")

              if (count === total) {
                (function() {
                  console.log('\nPeformance tuning complete!!!\n');
                  callback(viewSettings);
                })();
              }
            }
          });
        }
      });
    });
  })();
}

module.exports = function(app) {
  if (app.get('env') === 'development') {
    return {
      initiate: function(callBack) {
        nocompress(callBack);
      }
    };
  } else {
    return {
      initiate: function(callBack) {
        compress(callBack);
      }
    };
  }
};
