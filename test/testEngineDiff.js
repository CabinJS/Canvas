'use strict';

var fs = require('fs');

var beautifyHtml = require('js-beautify').html;
require('should');
var wrench = require('wrench');

describe('Candy theme', function () {

  var EJSSiteName  = '.engineDiff';
  var JadeSiteName = 'dist';

  it('should generate the same site using EJS and Jade', function () {
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

        var EJSFile = beautifyHtml(fs.readFileSync(file, 'utf8').replace(/\n/g, '').replace(/ /g, ''), {indent_size: 2});
        var JadeFile = beautifyHtml(fs.readFileSync(file.replace(EJSSiteName, JadeSiteName), 'utf8').replace(/\n/g, '').replace(/ /g, ''), {indent_size: 2});
        EJSFile.should.eql(JadeFile);
      });
  });
});