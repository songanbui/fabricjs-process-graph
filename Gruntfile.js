module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.compiled.js': 'index.js',
        },
        options: {
          transform: [
            [
              'babelify',
              {
                presets: ['@babel/preset-env'],
              },
            ],
          ],
          browserifyOptions: {
            debug: true,
          },
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      },
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/<%= pkg.name %>.min.js.map',
        },
        src: 'dist/<%= pkg.name %>.compiled.js',
        dest: 'dist/<%= pkg.name %>.min.js',
      },
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        esversion: '6',
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['jshint', 'browserify:dist', 'uglify']);
};
