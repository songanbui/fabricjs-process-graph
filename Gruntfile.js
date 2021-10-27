module.exports = function Gruntfile(grunt) {
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
        esversion: '8',
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
        },
      },
    },
    eslint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['eslint', 'browserify:dist', 'uglify']);
  grunt.registerTask('no-eslint', ['browserify:dist', 'uglify']);
};
