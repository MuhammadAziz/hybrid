module.exports = function (grunt) {
        "use strict";
        var packages = "com.asterx.mrapp";
        var source = "app/";
        var simulate = "simulate/content";
		var debug = "live";
        var target = "debug/app.apk";
		var androidTarget = "12590FAA-5EDD-4B12-856D-F52A0A1599F2/";
        var port = 8282;
        grunt.initConfig({
                pkg: grunt.file.readJSON("package.json"),
				//Run synchronize folder 
                sync: {
					sync_to_target: {
						files: [
							{cwd: source, src: "**/*", dest: debug}
						]
					},
					sync_live: {
						files: [
							{ cwd: source, src: 'css/**/*.css', dest: debug },
							{ cwd: source, src: 'js/**/*.js', dest: debug },
							{ cwd: source, src: '**/*.html', dest: debug }
						]
					}
                },
				//Run clean folder
				clean:{
					simulate:{
						clean: [simulate]
					},
					dist:{
						clean: ["dist"]
					}
				},
				//Run shell command
                shell: {
					//Install and run android app
					android: {
						command: function () {
							var result = [];
							//result.push("adb shell pm clear " + packages);
							result.push("adb install -r " + target);
							result.push("adb shell am start -a android.intent.action.MAIN -n " + packages + "/.TelerikCallbackActivity");
							return result.join("&&");
						}
					},
					ios: {
					},
					browse: {
						command: "start http://localhost:" + port
					},
					//Push file directly to /data/data (rooted device only) and restart app
					push: {
						command: [
							"adb root",
							"adb push " + debug + " /data/data/" + packages + "/files/" + androidTarget,
							"adb shell am force-stop " + packages,
							"adb shell am start -a android.intent.action.MAIN -n " + packages + "/.TelerikCallbackActivity"
						].join("&&")
					},
					clean_live:{
						command: "rm -R live/*"
					},
					clean_dist: {
						command: "rm -R dist/*"
					}
                },
                // Copy the source files into the dist directory
                copy: {
					all: {
						files: [
							{
								expand: true,
								cwd: "app/",
								src: ["**/*",  '!**/*.apk'],
								dest: "dist/",
								dot: true
							}
						]
					}
                },
                // Build AppBuilder release builds for iOS & Android
                appbuilder: {
					options: {
						debug: true								
					},
					android: {
						options: {
							platform: "android",
							certificate: "Aziz Muhammad" //@see: "cert/Readme.txt"
						},
						files: {
							"debug/app.apk": ["dist"]
						}
					},
					ios: {
						options: {
							platform: "ios",
							provision: "AsterX MediRecords iOS app Development",
							certificate: "iPhone Developer: Muhammad Aziz (C8948836V9) 1"
						},
						files: {
							"debug/app.ipa": ["dist"]
						}
					}
                },
                // Run JSHint using the .jshintrc file for config
                jshint: {
					options: {
						jshintrc: true
					},
					all: ["*.js", "app/js/*.js"]
                },
                // Run JSCS using the .jscsrc file for config
                jscs: {
					all: ["*.js", "app/js/*.js"],
					options: {
						config: ".jscsrc"
					}
                },
                // Run CSSLint using the .csslintrc file for config
                csslint: {
					all: ["app/css/**/*.css"],
					options: {
						csslintrc: ".csslintrc"
					}
                },
                // Run HTMLLint
                htmllint: {
                        all: ["app/**/*.html"]
                },
                // Compile all .scss files into .css files
                sass: {
					all: {
						files: [
							{
								expand: true,
								cwd: "app/scss/",
								src: "*.scss",
								dest: "app/css/",
								ext: ".css"
							}
						]
					}
                },
                //  Run Uglify on all JavaScript files in the dist directory
                uglify: {
					all: {
						files: [
							{
								expand: true,
								src: "dist/js/**/*.js"
							}
						]
					}
                },
                // Minify all CSS files in the dist directory
                cssmin: {
					all: {
						files: [
							{
								expand: true,
								src: "dist/css/**/*.css"
							}
						]
					}
                },
                // Minify all HTML files in the dist directory
                htmlmin: {
					options: {
						removeComments: true,
						collapseWhitespace: true
					},
					all: {
						files: [
							{
								expand: true,
								src: "dist/**/*.html"
							}
						]
					}
                },
                // Compress all images in the dist directory
                imagemin: {
					all: {
						files: [
							{
								expand: true,
								cwd: "dist/img/",
								src: ["**/*.{png,gif,jpg}"],
								dest: "dist/img/"
							}
						]
					}
                },
                // Watch for changes in the scss directory and invoke the
                // sass task as necessary
                watch: {
					sass: {
						files: ["app/scss/**/*.scss"],
						tasks: ["sass"]
					},
					sync: {
						files: [source + "**/*"],
						tasks: ["sync"],
						options: {
							event: ['added', 'changed', 'deleted']
						}
					},
					live:{
						files: [source + "**/*.{js,html,css,kml}"],
						tasks: ["sync:sync_live"],
						options: {
							event: ['added', 'changed', 'deleted']
						}
					}
                }
        });
        // Utility
        grunt.loadNpmTasks("grunt-contrib-watch");
        grunt.loadNpmTasks("grunt-contrib-copy");
        grunt.loadNpmTasks("grunt-shell");
        grunt.loadNpmTasks("grunt-sync");
        grunt.loadNpmTasks("grunt-contrib-appbuilder");
		grunt.loadNpmTasks('grunt-contrib-clean');
		
        // Linting
        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-jscs");
        grunt.loadNpmTasks("grunt-contrib-csslint");
        //grunt.loadNpmTasks( "grunt-html" );

        // Optimization
        grunt.loadNpmTasks("grunt-sass");
        /*
         grunt.loadNpmTasks( "grunt-contrib-uglify" );
         grunt.loadNpmTasks( "grunt-contrib-cssmin" );
         grunt.loadNpmTasks( "grunt-contrib-htmlmin" );
         grunt.loadNpmTasks( "grunt-contrib-imagemin" );
        // */

        grunt.registerTask("default", ["lint"]);
        //grunt.registerTask( "lint", [ "jshint", "jscs", "csslint", "htmllint" ]);
        grunt.registerTask("lint", ["jshint", "csslint"]);
        /*
         grunt.registerTask( "optimize", [ "sass", "uglify", "cssmin", "htmlmin", "imagemin"]);
         
         grunt.registerTask( "build", [ "lint", "copy", "optimize" ]);
         */
        //grunt.registerTask("dev", ["lint", "sync", "http-server:dev", "shell:browse", "watch:sync"]);
        grunt.registerTask("reload", ["shell:push"]);
        grunt.registerTask("live", ["lint", "sync:sync_live", "reload", "watch:live"]);
        grunt.registerTask("build", ["lint", "shell:clean_dist", "copy"]);
        grunt.registerTask("android", ["build", "appbuilder:android", "shell:android"]);
        grunt.registerTask("ios", ["build", "appbuilder:ios"]);
};