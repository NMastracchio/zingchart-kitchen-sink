module.exports = function(grunt){
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'css/common.css': 'css/common.scss'
        }
      }
    },
    autoprefixer: {
      single_file: {
        src: 'css/common.css',
        dest: 'css/main.css'
      }
    },
    watch: {
      css: {
        files: [
          'app/styles/common.scss'
        ],
        tasks: ['sass', 'autoprefixer', 'requirejs']
      },
      scripts: {
        files: [
          'app/*',
          'app/*/*'
        ],
        tasks: ['requirejs']
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: 'app/',
          baseUrl: '.',
          dir: 'dist/',
          mainConfigFile: 'app/config.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  //grunt.registerTask('default', ['sass', 'autoprefixer']);
  grunt.registerTask('default', ['watch']);
};