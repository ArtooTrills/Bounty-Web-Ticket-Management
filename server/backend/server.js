// Shared modules
/*
 Cannot have external dependencies referenced in this file - keeps it portable
*/

exports.init = function() {

  var exitHandler = function(err) {
    // Do stuff and exit gracefully

    if (err) {
      console.log('** Error: ' + err);
      process.exit(1);
    }

    console.log('Exiting app...');
    process.exit(0);
  };

  var database = function(mongoose, url, env) {
    var name = app_settings.applicationName.toLowerCase();
    var connectCallback = null;
    var databaseConf = {};
    var options = {
      socketOptions: {
        keepAlive: 0
      }
    }

    if (env.toLowerCase() === 'development') {
      mongoose.set('debug', true);
      databaseConf = {
        method: mongoose,
        url: url + name + '_dev'
      };

    } else {

      databaseConf = {
        method: mongoose,
        url: url + name + '_prod'
      };
    }

    function connect(cb) {
      connectCallback = cb
      console.log('Connecting to database...');
      databaseConf.method.connect(databaseConf.url, {
        server: options
      });
    }

    databaseConf.method.connection.on('error', console.log);
    databaseConf.method.connection.on('connected', function() {
      console.log('\nDatabase connection established!\n')
      connectCallback();
    });

    databaseConf.method.connection.on('disconnected', function() {
      setTimeout(function() {
        console.log('Reconnecting to database...');
        connect();
      }, 1000);
    });

    return {
      connect: connect
    };
  };

  setupServer = function(express, port, root) {
    // Create an HTTP service
    express.app.use(root, express.router);
    express.app.set('port', port);
    express.app.listen(express.app.get('port'), function() {
      console.log("Node app is listening on IP: " + express.app.listen().address().address + "  on port: " + express.app.get('port') + '\n\n')
    });
  };

  var initLogging = function(morgan, env) {
    if (env === 'development') {

      morgan.token('newline', function getDateToken(req, res, format) {
        return String("\n");
      });

      morgan.token('tab', function getDateToken(req, res, format) {
        return String("\t");
      });

      morgan.token('cst-date', function getDateToken(req, res, format) {
        var date = new Date()
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        var strTime = hours + ':' + minutes + '.' + seconds;
        return String(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime);
      });

      morgan.format('dev-custom', function developmentFormatLine(tokens, req, res) {

        // get the status code if response written
        var status = res._header ? res.statusCode : undefined

        // get status color
        var color = status >= 500 ? 31 // red
          : status >= 400 ? 33 // yellow
          : status >= 300 ? 36 // cyan
          : status >= 200 ? 32 // green
          : 0 // no color

        // get colored function
        var fn = developmentFormatLine[color]

        if (!fn) {
          // compile
          fn = developmentFormatLine[color] = morgan.compile(':newline:cst-date - \x1b[0mIP: [\x1b[35m:remote-addr\x1b[0m] :method :url \x1b[' + color + 'm:status \x1b[0m:response-time ms - :res[content-length]\x1b[0m :newline :tab user-agent: :user-agent')
        }

        return fn(tokens, req, res)
      });

      return morgan('dev-custom');

    } else {
      return null;
    }
  };

  return {
    exitHandler: exitHandler,
    initLogging: initLogging,
    database: database,
    setupServer: setupServer
  };
}
