/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 */
'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration
  // tunneling to PSI and displaying results in terminal
  grunt.initConfig({
    pagespeed: {
      options: {
        nokey: true,
        locale: "en_GB",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    },
    // make JS small
    uglify: {
      my_target: {
        files: {
          'js/perfmatters.min.js': ['js/perfmatters.js'],
          'js/fontLoader.min.js': ['js/fontLoader.js'],
          'js/analyticsInfo.min.js': ['js/analyticsInfo.js'],
          'views/js/main.min.js' : ['views/js/main.js']
        }
      }
    },
    // make CSS small
    cssmin: {
      target: {
        files: {
          'css/styles.min.css': ['css/style.css', 'css/print.css', 'css/portrait.css'],
          'views/css/styles.min.css': ['views/css/style.css', 'views/css/bootstrap-grid.css']
        }
      }
    },
    // make IMG small
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,
          cwd: 'views/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'views/images/'
        }]
      },
    },
    // make HTML small
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'deploy/index.html': 'process/index.html',
          'deploy/project-2048.html': 'process/project-2048.html',
          'deploy/project-mobile.html': 'process/project-mobile.html',
          'deploy/project-webperf.html': 'process/project-webperf.html',
          'deploy/pizza.html': 'process/pizza.html'
        }
      }
    },
    processhtml: {
      options: {
        recursive: true,
        process: true
      },
      dist: {
        files: {
          'process/index.html': ['index.html'],
          'process/project-2048.html': ['project-2048.html'],
          'process/project-mobile.html': ['project-mobile.html'],
          'process/project-webperf.html': ['project-webperf.html'],
          'process/pizza.html': ['views/pizza.html']
        }
      }
    },
    base64: {
      target: {
        files: {
          'img/2048.b64': 'img/2048.png',
          'img/2048_thumb.b64': 'img/2048_thumb.jpg',
          'img/cam_be_like.b64': 'img/cam_be_like.png',
          'img/mobilewebdev.b64': 'img/mobilewebdev.png',
          'img/moWebOp_thumb.b64': 'img/moWebOp_thumb.jpg',
          'img/profilepic.b64': 'img/profilepic.png',
          'img/webOp_thumb.b64': 'img/webOp_thumb.jpg',
          'views/images/pizza.b64': 'views/images/pizza.png',
          'views/images/pizzeria.b64': 'views/images/pizzeria.png',
          'views/images/pizzeria_thumb.b64': 'views/images/pizzeria_thumb.png',
          'views/images/rsz_pizza.b64': 'views/images/rsz_pizza.png'
        }
      }
    }
  });

  // Register custom task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 8080;
    var path = grunt.option('path') || '';

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url+path);
      console.log('running on url: ', url+path);
      grunt.task.run('pagespeed');
      done();
    });
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-base64');

  // Register default tasks
  grunt.registerTask('default', ['psi-ngrok']);
  grunt.registerTask('build', ['cssmin', 'uglify', 'processhtml', 'htmlmin']);
}
