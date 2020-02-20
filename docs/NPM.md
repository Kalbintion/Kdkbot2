# [NodeJS] & NPM
KDKBot uses [NPM] from [NodeJS] for building assets and managing code styles.

###### [Grunt]
Task runner used to run the various scripts that generate the JS and CSS

###### [Grunt Clean]
Grunt plugin used to delete files and folders to ensure a clean rebuild

###### [Grunt Uglify]
Grunt plugin used to minify the output JS files to reduce filesize and remove comments, etc.

###### [Grunt SASS]
Grunt plugin to compile the SASS files (.scss) to CSS

###### [Grunt Autoprefixer]
Grunt plugin to convert CSS3+ properties to browser specific properties if necessary for backwards compatibility

###### [Grunt CSS Min]
Grunt plugin to minify the CSS files and remove comments, spaces, etc. to reduce files size

###### [Grunt Watch]
Grunt plugin to detect changes on files and trigger a rebuild automatically

###### [Babel]
Allows the use of ES7+ code that is currently not fully supported for all browsers by compiling it to ES6 shims while still allowing the use of upcoming JS features

###### [Dotenv]
Loads any `.env` file contents as environment variables into memory at startup

###### [Connect Live Reload]
Works in conjunction with the `Grunt Watch` module to automatically reloads browsers connected to the localhost server when changes are detected to files to make it faster to develop locally 

###### [Rollup]
Used to convert ES-module declarations to browser compatible module declarations as browsers don't yet support the module spec

###### [db-migrate]
Handles database updates and changes


[NodeJS]:https://nodejs.org/en/
[NPM]:https://www.npmjs.com/get-npm
[Rollup]:https://rollupjs.org/guide/en/
[Dotenv]:https://github.com/motdotla/dotenv
[Connect Live Reload]:https://github.com/intesso/connect-livereload
[Babel]:https://babeljs.io/
[Grunt Autoprefixer]:https://github.com/postcss/autoprefixer
[Grunt Watch]:https://github.com/gruntjs/grunt-contrib-watch
[Grunt CSS Min]:https://github.com/gruntjs/grunt-contrib-cssmin
[Grunt SASS]:https://github.com/gruntjs/grunt-contrib-sass
[Grunt Uglify]:https://github.com/gruntjs/grunt-contrib-uglify
[Grunt Clean]:https://github.com/gruntjs/grunt-contrib-clean
[Grunt]:https://gruntjs.com/
[db-migrate]:https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/