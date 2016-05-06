
// Include stuff needed to make the build work
var gulp = require('gulp');
var gls = require('gulp-live-server');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


var bases = {
    src: 'src/',
    dist: 'dist/',
};

var paths = {
    html: ['*.html'],
    scripts: ['h*.js'],
    libs: ['jspm_packages/npm/babel-core@5.8.38/browser.js', 'jspm_packages/github/jmcriffey/bower-traceur@0.0.108/traceur.js','jspm_packages/system.js', 'jspm_packages/github/angular/bower-angular@1.5.5/angular.min.js'],
    styles: [],
    images: [],
    extras: ['main.js'],
};


// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(bases.dist)
        .pipe(clean());
});

// Process scripts and concatenate them into one output file
// This depends on the 'clean' task so that will be run first.
gulp.task('scripts', ['clean'], function () {
    gulp.src(paths.scripts, { cwd: bases.src })
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('src.min.js'))
        .pipe(gulp.dest(bases.dist + '/'));
});



// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function () {
    gulp.src(paths.images, { cwd: bases.src })
        .pipe(imagemin())
        .pipe(gulp.dest(bases.dist + 'images/'));
});


// Copy all other files to dist directly
gulp.task('copy', ['clean'], function () {
    // Copy html
    gulp.src(paths.html, { cwd: bases.src })
        .pipe(gulp.dest(bases.dist));

    // Copy styles
    gulp.src(paths.styles, { cwd: bases.src })
        .pipe(gulp.dest(bases.dist + 'styles'));

    // Copy lib scripts, maintaining the original directory structure
    gulp.src(paths.libs, { cwd: '.' })
        .pipe(gulp.dest(bases.dist));

    // Copy extra html5bp files
    gulp.src(paths.extras, { cwd: bases.src })
        .pipe(gulp.dest(bases.dist));
});


// Create a task to start the live-server
gulp.task('serve', function () {
    //1. serve with default settings 
    //var server = gls.static(); //equals to gls.static('public', 3000); 
    //server.start();

    //2. serve at custom port 
    var server = gls.static('dist', 8888);
    server.start();

    //3. serve multi folders 
    //var server = gls.static(['dist', '.tmp']);
    //server.start();

    //use gulp.watch to trigger server actions(notify, start or stop) 
    gulp.watch(['static/**/*.css', 'static/**/*.html'], function (file) {
        server.notify.apply(server, [file]);
    });
});



// The default task
gulp.task('default', ['clean', 'scripts', 'copy', 'serve']);
