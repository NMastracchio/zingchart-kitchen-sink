module.exports = function(grunt){
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'app/styles/common.css': 'app/styles/common.scss'
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
      src: {
        files: [
          '/Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/lib/zingchart-dev/src/*',
          '/Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/lib/zingchart-dev/src/*/*',
          '/Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/lib/zingchart-dev/src/*/*/*'
        ],
        tasks: ['shell']
      },
      scripts: {
        files: [
          'app/*',
          'app/*/*',
          'app/*/*/*'
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
    },
    shell: {
      options: {
        stderr: false
      },
      target: {
        command: 'cd /Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/lib/zingchart-dev/build/;' 
          + 'php index.php -DEV;' 
          + 'cp zingchart.min.js /Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/node_modules/zingchart/client;'
          + 'cp -r modules/* /Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/node_modules/zingchart/client/modules;'
          + 'mv /Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/node_modules/zingchart/client/modules/zingchart-populationpyramid.js ' 
          + '/Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/node_modules/zingchart/client/modules/zingchart-populationpyramid.min.js;'
          + 'mv /Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/node_modules/zingchart/client/modules/zingchart-waterfall.js ' 
          + '/Users/nicholasmastracchio/Documents/zingchart-kitchen-sink/node_modules/zingchart/client/modules/zingchart-waterfall.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-shell');

  //grunt.registerTask('default', ['sass', 'autoprefixer']);
  grunt.registerTask('default', ['watch']);
};