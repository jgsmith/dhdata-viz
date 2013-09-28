module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: {
          except: ['jQuery', '$', 'd3', 'window']
        }
      },
      my_target: {
        files: {
          'dist/plots.min.js': 'dist/plots.js'
        }
      }
    },
    coffee: {
      compileJoined: {
        files: {
          'dist/plots.js': [
            'src/namespace.coffee', 
            'src/plots/*.coffee'
          ]
        }
      }
    }   
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
};
