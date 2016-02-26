/**
 * Created by mat on 16-02-25.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            jade: {
                files: ['views/**']
            },
            js: {
                files: ['public/*.js', '*.js'],
                tasks: ['jshint']
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'public/*.js', '*.js']
        },
        nodemon: {
            dev: {
                options: {
                    file:'app.js',
                    args:[],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: [],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './public/lib',
                    layout: 'byComponent',
                    install: true,
                    verbose: true,
                    cleanBowerDir: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.option('force', true);

    grunt.registerTask('default', ['jshint', 'concurrent']);

    grunt.registerTask('install', ['bower']);
};
