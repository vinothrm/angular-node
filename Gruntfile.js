'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config:{
          assets : 'assets/jspackage',
             app : 'app/js',
            mainApp : 'assets/js'

        },
        browserify: {
            dist:{
                files : {
                    '<%= config.assets %>/bundle.js':['<%= config.mainApp %>/**/*.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= config.app %>/<%= pkg.name %>.min.js': ['<%= config.assets %>/**/*.js']
                }
            }
        },
        sass:{
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/sass',
                    src: ['*.scss'],
                    dest: 'app/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
        files: ['assets/js/**/*','assets/sass/**/*'],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');


    grunt.registerTask('default', ['browserify','uglify','sass']);
    grunt.registerTask('onlyJS', ['browserify','uglify']);


};