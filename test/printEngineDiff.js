'use strict';
module.exports = function () {
  var fs = require('fs');

  require('colors');
  var jsDiff = require('diff');
  var beautifyHtml = require('js-beautify').html;
  var wrench = require('wrench');

  var EJSSiteName  = '.engineDiff';
  var JadeSiteName = 'dist';

  var files = wrench.readdirSyncRecursive(EJSSiteName);

  files
    .filter(function (file) {
      return file.indexOf('.html') !== -1;
    })
    .map(function (file) {
      return EJSSiteName + '/' + file;
    })
    .forEach(function (file) {
      if (!fs.statSync(file).isFile()) {
        return;
      }

      var EJSFile = beautifyHtml(fs.readFileSync(file, 'utf8').replace(/\n/g, ''));
      var JadeFile = beautifyHtml(fs.readFileSync(file.replace(EJSSiteName, JadeSiteName), 'utf8').replace(/\n/g, ''));
      var diff = jsDiff.diffChars(EJSFile, JadeFile);


      var numberOfDiffs = diff.filter(function (fileDiff) {
        return fileDiff.value.trim().length && (fileDiff.removed || fileDiff.added);
      });

      if (diff.length === 0 || numberOfDiffs.length === 0) return;

      console.log('\n\nDiff for '.blue + file.slice(EJSSiteName.length + 1).magenta);
      console.log('Green is Jade.'.green + '\nRed is EJS.\n'.red);

      diff.forEach(function (templateDiff, i, diffs) {

        if (templateDiff.added && diffs[i + 1] && diffs[i + 1].removed) {
          var swap = templateDiff;
          templateDiff = diffs[i + 1];
          diffs[i + 1] = swap;
        }
        if (templateDiff.removed) {
          process.stdout.write(templateDiff.value.red);
        } else if (templateDiff.added) {
          process.stdout.write(templateDiff.value.green);
        } else {
          process.stdout.write(templateDiff.value);
        }
      });
    });
};
