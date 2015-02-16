/*!
 * petal - Gruntfile
 * http://shakrmedia.github.io/petal
 * Copyright 2015 Shakr Media Co., Ltd.
 */

module.exports = function(grunt) {
  'use strict';
  
  require("load-grunt-tasks")(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Meta
    meta: {
      banner: '/* \n' +
              ' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
              ' * <%= pkg.description %> \n' +
              ' * <%= pkg.homepage %> \n' +
              ' * \n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; <%= pkg.license %> License \n' +
              ' */\n'
    },

    // LESS
    less: {
      src: {
        expand: true,
        cwd: "less",
        src: ["petal.less"],
        ext: ".css",
        dest: "build"
      }
    },

    // Autoprefixer
    autoprefixer: {
      options: {
        browser: ["last 3 versions", "ie 10"]
      },
      build: {
        expand: true,
        cwd: "build",
        src: ["petal.css"],
        dest: "build"
      }
    },

    // css minify
    cssmin: {
      minify: {
        src: "build/petal.css",
        dest: "build/petal.min.css"
      }
    },


    // Banner
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= meta.banner %>'
      },
      files: {
        src: [
            "build/<%= pkg.codename %>.css",
            "build/<%= pkg.codename %>.min.css",
          ]
      }
    },

    // watch
    watch: {
      less: {
        files: ['less/**/*'],
        tasks: ['default']
      }
    },
    
    // assemble
    assemble: {
	  options: {
        flatten: true,
        partials: 'docs/template/partial/*.hbs',
        layoutdir: 'docs/template/layouts',
        layout: 'default.hbs'
      },
      docs: {
        files: {'index': ['docs/template/layouts/*.hbs']}
      }
    }
  });
  
  grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'usebanner']);
  grunt.registerTask('dev', ['watch']);
  
}