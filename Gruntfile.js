const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");

const baseDir = "web";
const outDir = `${baseDir}/prod`;

const baseScssDir = `${baseDir}/css`;
const baseJsDir = `${baseDir}/js`;
const baseImageDir = `${baseDir}/images`;

const outCssDir = `${outDir}/css`;
const outJsDir = `${outDir}/js`;

const jsFiles = [{
	"expand": true,
	"cwd": baseJsDir,
	"src": ["*.js", "!*.min.js"],
	"dest": outJsDir,
	"ext": ".js",
}];

const jsBabelFiles = {};
const rollupFiles = {};

// Read the directory of JS files to use as the root "bundles" to compile all other JS files into
fs.readdirSync(baseJsDir, {"encoding": "utf8"}).forEach((filename) => { // eslint-disable-line no-sync
	if (filename.match(".js")) {
		const path = `${outJsDir}/${filename}`;

		// Rollup needs to process the files first to convert the ES Modules
		rollupFiles[path] = [`${baseJsDir}/${filename}`];

		// Babel processes the files that Rollup outputs in the `dist` dir and generates the final minified file
		jsBabelFiles[path.replace(".js", ".min.js")] = path;
	}
});

module.exports = function(grunt) {
	grunt.initConfig({
		// Compiles the ES6 modules together
		"rollup": {
			"options": {
				"format": "iife",
				"plugins": [
					resolve(),
					babel({"exclude": "node_modules/**"}),
				],
			},
			"dist": {"files": rollupFiles},
		},

		// Transpiles ES6+ code to be usable in modern browsers
		"babel": {
			"dist": {
				"options": {
					"sourceMaps": "inline",
					"minified": true,
					"compact": true,
					"comments": false,
				},
				"files": jsBabelFiles,
			},
			"dev": {
				"options": {
					"sourceMaps": false,
					"minified": false,
					"compact": false,
					"comments": true,
				},
				"files": jsBabelFiles,
			},
		},

		// Minimifies and mangles JS files for smallest size
		"uglify": {
			"dev": {
				"options": {"mangle": false},
				"files": jsFiles,
			},
			"dist": {
				"options": {
					"mangle": true,
					"compress": true,
					"sourceMap": false,
				},
				"files": jsFiles,
			},
		},

		// Compiles SASS files into CSS
		"sass": {
			"dist": {
				"options": {"style": "expanded"},
				"files": [{
					"expand": true,
					"cwd": baseScssDir,
					"src": ["*.scss"],
					"dest": outCssDir,
					"ext": ".css",
				}],
			},
		},

		// Adds CSS prefixes for older browser versions that might still need `moz-` etc. property prefixes
		"autoprefixer": {
			"dist": {
				"files": [{
					"expand": true,
					"cwd": outCssDir,
					"src": ["*.css", "!*.min.css"],
					"dest": outCssDir,
					"ext": ".css",
				}],
			},
		},

		// Minifies CSS removing comments, whitespace, etc.
		"cssmin": {
			"target": {
				"files": [{
					"expand": true,
					"cwd": outCssDir,
					"src": ["*.css", "!*.min.css"],
					"dest": outCssDir,
					"ext": ".min.css",
				}],
			},
		},

		// Deletes old/previously generated files
		"clean": [
			".sass-cache",
			"web/dist/js/*.js",
			"web/css/*.css",
			"web/css/*.map",
		],

		// Watches for changes to files to reload the browser
		"watch": {
			"js": {
				"files": [`${baseJsDir}/**/*.js`],
				"tasks": ["rollup", "babel:dev"],
				"options": {"livereload": true},
			},
			"css": {
				"files": [`${baseScssDir}/**/*.scss`],
				"tasks": ["sass", "autoprefixer", "cssmin"],
				"options": {"livereload": true},
			},
			"php": {
				"files": [
					"*.php",
					"controllers/**/*.php",
					"controllers/*.php",
					"core/**/*.php",
					"core/*.php",
					"models/**/*.php",
					"views/**/*.php",
				],
				"options": {"livereload": true},
			},
			"livereload": {
				"files": [
					`${baseImageDir}/**/*.*`,
				],
				"options": {"livereload": true},
			},
		},
	});

	grunt.loadNpmTasks("grunt-babel");
	grunt.loadTasks("./tasks"); // Load our custom tasks
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	const preSharedTasks = ["clean", "rollup"];
	const postSharedTasks = ["sass", "autoprefixer", "cssmin"];
	const prodTasks = [...preSharedTasks, "babel:dist", ...postSharedTasks];
	const devTasks = [...preSharedTasks, "babel:dev", ...postSharedTasks, "watch"];

	grunt.registerTask("default", devTasks);
	grunt.registerTask("build", prodTasks);
};
