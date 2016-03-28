//#!/usr/bin/env node
var path = require('path'),
   fs = require('fs'),
   extend = require('util')._extend,
   exec = require('child_process').exec,
   processes = [];

var baseDir = path.resolve(__dirname, '..'),
   srcDir = path.resolve(baseDir, '.'),
   //chimpBin = path.resolve(baseDir, '.scripts/node_modules/.bin/chimp');
   chimpBin = 'chimp';

var appOptions = {
  settings: 'settings.json',
  port: 3000,
  env: {
    ROOT_URL: 'http://localhost:3000'
  }
};


var chimpSwitches = '';
   /*' --path=' + path.resolve('tests/specifications') +
   ' --domainSteps=' + path.resolve('tests/step_definitions/domain') +
   ' --criticalSteps=' + path.resolve('tests/step_definitions/critical') +
   ' --watchSource=' + path.resolve('tests') +
   ' --singleSnippetPerFile=1' +
   ' --no-source';*/


chimpNoMirror();

function chimpNoMirror() {
  appOptions.waitForMessage = 'Example app listening on port 3000!';
  startApp(function () {
    startChimp('--ddp=' + appOptions.env.ROOT_URL + chimpSwitches);
  });
}

function startApp(callback) {
  startProcess({
    name: 'App Test',
    command: 'node index.js --settings ' + appOptions.settings + ' --port ' + appOptions.port,
    waitForMessage: appOptions.waitForMessage,
    options: {
      cwd: srcDir,
      env: extend(appOptions.env, process.env)
    }
  }, callback);
}

function startChimp(command) {
  command = '';
  startProcess({
    name: 'Chimp',
    command: chimpBin + ' ' + command
  });
}

function startProcess(opts, callback) {
  var proc = exec(
     opts.command,
     opts.options
  );
  console.log(opts.command);

  if (opts.waitForMessage) {
    proc.stdout.on('data', function waitForMessage(data) {
      if (data.toString().match(opts.waitForMessage)) {
        if (callback) {
          callback();
        }
      }
    });
  }
  if (!opts.silent) {
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
  }
  if (opts.logFile) {
    var logStream = fs.createWriteStream(opts.logFile, {flags: 'a'});
    proc.stdout.pipe(logStream);
    proc.stderr.pipe(logStream);
  }
  proc.on('close', function (code) {
    console.log(opts.name, 'exited with code ' + code);
    for (var i = 0; i < processes.length; i += 1) {
      processes[i].kill();
    }
    process.exit(code);
  });
  processes.push(proc);
}