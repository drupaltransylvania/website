var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var scssFiles = 'scss/**/*.scss';
var cssDest = 'css/';

gulp.task('scripts', function() {
	return gulp.src(['scripts/*.js', '!**/*min.js'])
		.pipe(concat('script.js'))
		.pipe(minify({
			ext: {
				min:'.min.js'
			}
		}))
		.pipe(gulp.dest('scripts/build'));
});

gulp.task('scripts-lint', function() {
	return gulp.src(['scripts/*.js', '!**/*min.js', '!**/zoom.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
	return gulp.src(scssFiles)
		.pipe(sassLint({
			options: {
				formatter: 'stylish',
				'merge-default-rules': true
			},
			rules: {
				'indentation': [1, {'size': '4'}],
				'property-sort-order': [1, {'order': 'smacss'}],
				'mixins-before-declarations': [1, {'exclude': ['large-mobile', 'tablet', 'medium-desktop', 'large-desktop', 'extra-large-desktop', 'on-events']}],
				'nesting-depth': 0,
				'no-ids': 0,
				'no-url-domains': 0,
				'no-url-protocols': 0
			},
			files: {ignore: ['scss/base/_reset.scss', 'scss/vendor/_slick-slider.scss', 'scss/vendor/_zoom.scss']}	
		}))
		.pipe(sassLint.format())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer())
		.pipe(gulp.dest(cssDest));
});

gulp.task('styles', function() {
	return gulp.src(['css/main.css'])
		.pipe(gulp.dest(cssDest))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(cssDest));
});

gulp.task('watch', function () {
	gulp.watch('scripts/*.js', ['scripts-lint']);
	gulp.watch('scripts/*.js', ['scripts']);
	gulp.watch(scssFiles, ['sass']);
	gulp.watch('css/main.css', ['styles']);
});

gulp.task('default', ['scripts', 'scripts-lint', 'sass', 'styles', 'watch']);
