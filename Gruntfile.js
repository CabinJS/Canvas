module.exports = function (grunt) {

  var gruntPagesConfig = JSON.parse(grunt.template.process(grunt.file.read('cabin.json'), {
      data: {
        templateEngine: grunt.option('lang') || 'jade'
      }
    })).gruntPagesConfig;

  gruntPagesConfig.posts.options.templateEngine = grunt.option('lang') || 'jade';

  grunt.initConfig({
    pages: gruntPagesConfig,
    compass: {
      dist: {
        options: {
          sassDir: 'src/styles',
          cssDir: 'dist/styles'
        }
      }
    },
    // Move files not handled by other tasks
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'dist',
          src: [
            'images/**',
            'scripts/**',
            'styles/**.css',
            'styles/fonts/**',
          ]
        }]
      }
    },
    watch: {
      dist: {
        files: ['dist/**'],
        options: {
          livereload: true
        }
      },
      compass: {
        files: ['src/styles/**'],
        tasks: ['compass']
      },
      pages: {
        files: [
          'posts/**',
          'src/layouts/**',
          'src/pages/**'
        ],
        tasks: ['pages']
      },
      copy: {
        files: [
          'src/images/**',
          'src/scripts/**',
          'src/styles/**.css',
          'src/styles/fonts/**'
        ],
        tasks: ['copy']
      }
    },
    connect: {
      dist: {
        options: {
        port: 5455,
        hostname: '0.0.0.0',
          middleware: function (connect) {
            return [
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              connect.static(require('path').resolve('dist'))
            ];
          }
        }
      }
    },
    open: {
      dist: {
        path: 'http://localhost:5455'
      }
    },
    clean: {
      dist: 'dist'
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }
  });

  grunt.registerTask('build', function(target) {
    if (target === 'GHPages') {
      gruntPagesConfig.options.data.baseUrl = '/Canvas/';
    }

    grunt.task.run([
      'clean',
      'pages',
      'compass',
      'copy'
    ]);
  });

  grunt.registerTask('deploy', [
    'build:GHPages',
    'gh-pages'
  ]);

  grunt.registerTask('default', [
    'build',
    'connect',
    'open',
    'watch'
  ]);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
