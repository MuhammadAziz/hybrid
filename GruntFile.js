module.exports = function(grunt) {
    "use strict";
    var packages = "com.asterx.mrapp";
    var source = "app/";
    var buildDestination = "dist";
    var releaseDir = "release";
    var simulate = "simulate/content";
    var debug = "live";
    var debug_ios = buildDestination + "/.ab/emulatorfiles/Cordova350.app";
    var target = "debug/app.apk";
    var androidTarget = "12590FAA-5EDD-4B12-856D-F52A0A1599F2/";
    var iPhone = "iPhone-4s";
    var releaseDate = (new Date()).toISOString().slice(0, 10);

    var iosRelease = {};
    iosRelease[releaseDir + "/mrapp-" + releaseDate + ".ipa"] = [buildDestination];

    var androidRelease = {};
    androidRelease[releaseDir + "/mrapp-" + releaseDate + ".apk"] = [buildDestination];

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        //Run synchronize folder
        sync: {
            android: {
                verbose: true,
                files: [{
                    cwd: buildDestination,
                    src: [
                        "css/**/*.css",
                        'js/**/*.js',
                        '**/*.html',
                        '**/*.jpg'
                    ],
                    dest: debug
                }]
            },
            //			ios: {
            //				verbose: true,
            //				updateAndDelete: true,
            //                                ignoreInDest: ["plugins", "plugins/**/*"],
            //				files: [
            //					{
            //						cwd: buildDestination + "/",
            //						src: [
            //							"css/**/*",
            //							"bower_components/**/*",
            //							"js/**/*",
            //							"img/**/*",
            //							"photo/**/*",
            //							"!scss/**/*",
            //							"*.html",
            //							"*.js",
            //							'!**/*.apk',
            //							"!.ab/**/*",
            //							"kendo/**/*",
            //							"!App_Resources/**/*",
            //						],
            //						dest: debug_ios + "/www"
            //					}
            //				]
            //			},
            dist: {
                verbose: true,
                updateAndDelete: true,
                ignoreInDest: [".ab", ".ab/**/*"],
                files: [{
                    cwd: source,
                    src: [
                        "**/*",
                        ".abignore",
                        ".debug.abignore",
                        ".release.abignore",
                        ".abproject",
                        ".debug.abproject",
                        ".release.abproject"
                    ],
                    dest: buildDestination
                }]
            }
        },
        //Run shell command
        shell: {
            debug_android: {
                command: function() {
                    var result = [];
                    //result.push("adb shell pm clear " + packages);
                    result.push("adb install -r " + target);
                    result.push("adb shell am start -a android.intent.action.MAIN -n " + packages + "/.TelerikCallbackActivity");
                    return result.join("&&");
                }
            },
            debug_ios: {
                command: "appbuilder --path " + buildDestination + " emulate ios --device " + iPhone
            },
            reload_android: {
                command: [
                    "adb root",
                    "adb push " + debug + " /data/data/" + packages + "/files/" + androidTarget,
                    "adb shell am force-stop " + packages,
                    "adb shell am start -a android.intent.action.MAIN -n " + packages + "/.TelerikCallbackActivity"
                ].join("&&")
            },
            reload_ios: {
                command: "ios-sim launch " + debug_ios + " --devicetypeid com.apple.CoreSimulator.SimDeviceType." + iPhone
            },
            clean_live: {
                command: "rm -rf live/"
            },
            clean_dist: {
                command: "rm -rf " + buildDestination + "/"
            },
            create_dir_debug: {
                command: "mkdir -p debug"
            },
            create_dir_release: {
                command: "mkdir -p " + releaseDir
            },
            remove_temp: {
                command: "rm -rf " + buildDestination + "/.ab"
            }
        },
        // Copy the source files into the dist directory
        copy: {
            //			all: {
            //				files: [
            //					{
            //						expand: true,
            //						cwd: "app/",
            //						src: ["**/*", '!**/*.apk'],
            //						dest: buildDestination + "/",
            //						dot: true
            //					}
            //				]
            //			},
            android: {
                files: [{
                    expand: true,
                    cwd: buildDestination + "/",
                    src: [
                        "css/**/*",
                        "bower_components/**/*",
                        "js/**/*",
                        "**/*.{jpg,png}",
                        "scss/**/*",
                        "**/*.html",
                        '!**/*.apk',
                        "!.ab/**",
                        "kendo/**/*",
                        "!App_Resources/**",
                        "!Plugins/**"
                    ],
                    dest: debug,
                    dot: true
                }]
            },
            ios: {
                files: [{
                    expand: true,
                    cwd: buildDestination + "/",
                    src: [
                        "css/**/*",
                        "bower_components/**/*",
                        "js/**/*",
                        "**/*.{jpg,png}",
                        "scss/**/*",
                        "**/*.html",
                        '!**/*.apk',
                        "!.ab/**",
                        "kendo/**/*",
                        "!App_Resources/**",
                        "!Plugins/**"
                    ],
                    dest: debug_ios + "/www/",
                    dot: true
                }]
            }
        },
        // Build AppBuilder release builds for iOS & Android
        appbuilder: {
            android: {
                options: {
                    debug: true,
                    platform: "android",
                    certificate: "Aziz Muhammad" //@see: "cert/Readme.txt"
                },
                files: {
                    "debug/app.apk": [buildDestination]
                }
            },
            ios: {
                options: {
                    debug: true,
                    platform: "ios",
                    provision: "AsterX MediRecords iOS app Development",
                    certificate: "iPhone Developer: Muhammad Aziz (C8948836V9) 1"
                },
                files: {
                    "debug/app.ipa": [buildDestination]
                }
            },
            android_release: {
                options: {
                    debug: false,
                    platform: "android",
                    certificate: "Aziz Muhammad" //@see: "cert/Readme.txt"
                },
                files: androidRelease
            },
            ios_release: {
                options: {
                    debug: false,
                    platform: "ios",
                    provision: "AsterX MediRecords iOS app Development",
                    certificate: "iPhone Developer: Muhammad Aziz (C8948836V9) 1"
                },
                files: iosRelease
            }
        },
        // Run JSHint using the .jshintrc file for config
        jshint: {
            options: {
                jshintrc: true
            },
            all: ["*.js", "app/js/**/*.js", "!app/js/libs/**/*.js"]
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
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: "app/scss/",
                    src: "*.scss",
                    dest: "app/css/",
                    ext: ".css"
                }]
            }
        },
        //  Run Uglify on all JavaScript files in the dist directory
        uglify: {
            all: {
                files: [{
                    expand: true,
                    cwd: buildDestination + "/js/",
                    src: "**/*.js",
                    dest: buildDestination + "/js/"
                }]
            }
        },
        // Minify all CSS files in the dist directory
        cssmin: {
            all: {
                files: [{
                    expand: true,
                    src: buildDestination + "/css/**/*.css"
                }]
            }
        },
        // Minify all HTML files in the dist directory
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            all: {
                files: [{
                    expand: true,
                    src: buildDestination + "/**/*.html"
                }]
            }
        },
        // Compress all images in the dist directory
        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: buildDestination + "/img/",
                    src: ["**/*.{png,gif,jpg}"],
                    dest: buildDestination + "/img/"
                }]
            }
        }
        // Watch for changes in the scss directory and invoke the
        // sass task as necessary
        //		watch: {
        //			sass: {
        //				files: ["app/scss/**/*.scss"],
        //				tasks: ["sass"]
        //			},
        //			sync: {
        //				files: [source + "**/*"],
        //				tasks: ["sync"],
        //				options: {
        //					event: ['added', 'changed', 'deleted']
        //				}
        //			}
        //            ,
        //            android: {
        //                files: [source + "**/*.{js,html,css,kml}"],
        //                tasks: ["sync:android"],
        //                options: {
        //                    event: ['added', 'changed', 'deleted']
        //                }
        //            },
        //            ios: {
        //                files: [source + "**/*.{js,html,css,kml}"],
        //                tasks: ["sync:ios"],
        //                options: {
        //                    event: ['added', 'changed', 'deleted']
        //                }
        //            }
        //		}
    });
    // Utility
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-sync");
    grunt.loadNpmTasks("grunt-contrib-appbuilder");

    // Linting
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs");
    //grunt.loadNpmTasks( "grunt-html" );

    // Optimization
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    /*

 grunt.loadNpmTasks( "grunt-contrib-cssmin" );
 grunt.loadNpmTasks( "grunt-contrib-htmlmin" );
 grunt.loadNpmTasks( "grunt-contrib-imagemin" );
 // */

    grunt.registerTask("default", ["lint"]);
    //grunt.registerTask( "lint", [ "jshint", "jscs", "csslint", "htmllint" ]);
    grunt.registerTask("lint", ["jshint"]);
    /*
 grunt.registerTask( "optimize", [ "sass", "uglify", "cssmin", "htmlmin", "imagemin"]);

 grunt.registerTask( "build", [ "lint", "copy", "optimize" ]);
 */
    //grunt.registerTask("dev", ["lint", "sync", "http-server:dev", "shell:browse", "watch:sync"]);

    //Sync between app and dist, then do optimize
    grunt.registerTask("optimize", ["sass", "sync:dist", "uglify"]);

    //build app
    grunt.registerTask("build", ["lint", "optimize"]);

    grunt.registerTask("development", ["lint", "sass", "sync:dist"]);

    //Livesync to device, note: need to build first
    grunt.registerTask("android", ["development", "copy:android", "shell:reload_android"]);
    grunt.registerTask("ios", ["development", "copy:ios", "shell:reload_ios"]);

    //build app in debug mode
    grunt.registerTask("debug:android", ["development", "shell:create_dir_debug", "appbuilder:android", "shell:debug_android"]);
    grunt.registerTask("debug:ios", ["development", "shell:create_dir_debug", "shell:debug_ios"]);

    //Run this task if there is any error when running `grunt ios`
    grunt.registerTask("reios", ["shell:remove_temp", "shell:clean_dist", "debug:ios"]);

    //build app in release mode
    grunt.registerTask("release:android", ["build", "shell:create_dir_release", "appbuilder:android_release"]);
    grunt.registerTask("release:ios", ["build", "shell:create_dir_release", "appbuilder:ios_release"]);

    //	grunt.registerTask("build", ["lint", "shell:clean_dist", "copy"]);
    //	grunt.registerTask("android", ["build", "appbuilder:android", "shell:install_android"]);
    //	grunt.registerTask("ios", ["build", "appbuilder:ios"]);
    //	grunt.registerTask("install:android", ["android"]);
    //	grunt.registerTask("install:ios", ["shell:install_ios"]);
    //	grunt.registerTask("emulate", ["install:ios"]);
};
