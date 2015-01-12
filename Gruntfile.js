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
    // make IMGES small
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

  // Register default tasks
  grunt.registerTask('default', ['psi-ngrok']);
  grunt.registerTask('pushprod', ['imagemin', 'cssmin', 'uglify']);
}
