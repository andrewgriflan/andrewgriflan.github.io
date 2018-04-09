const autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      cleancss = require('gulp-clean-css'),
      concat = require('gulp-concat'),
      gulp = require('gulp'),
      imagemin = require('gulp-imagemin'),
      notify = require('gulp-notify'),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename'),
      sass = require('gulp-ruby-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      imgagemin = require('gulp-imagemin'),
      svgo = require('gulp-svgo'),
      uglify = require('gulp-uglify');

gulp.task('scripts', function() {
	return gulp.src([
    './src/scripts/vendor/modernizr-3.5.0.min.js',
		'./src/scripts/vendor/TimelineMax.min.js',
		'./src/scripts/vendor/TweenMax.min.js',
		'./src/scripts/scripts.js'
	])
	.pipe(plumber())
	.pipe(concat('scripts.js'))
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('dist/js'))
	.pipe(notify({
		message: 'Scripts Compiled',
		onLast: true
	}));
});

gulp.task('styles', function() {
	return sass([
		'src/styles/styles.scss'
	], {
		noCache: true,
		style: 'compact',
		sourcemap: true,
	})
	.pipe(plumber())
	.pipe(cleancss({
		keepSpecialComments: false,
		processImport: false
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions', 'IE 11', 'Safari 8']
	}))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(sourcemaps.write('maps', {
		includeContent: false,
		sourceRoot: '/src/scss'
	}))
	.pipe(gulp.dest('dist/css'))
	.pipe(notify({
		message: '"Styles" Task Completed'
	}));
});


gulp.task('img-min', () =>
	gulp.src('./src/img/**/*')
		.pipe(plumber())
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng(),
			imagemin.svgo({
				plugins: [
					{
						removeViewBox: false
					}, {
						minifyStyles: false
					}, {
                        cleanupIDs: false
                    }
				]
			})
		], {verbose: true}))
		.pipe(gulp.dest('dist/img'))
		.pipe(notify({message: 'image min Task Completed'}))
);

gulp.task('watch', function() {
	gulp.watch(['src/*.scss', 'src/**/*.scss'], ['styles']);
	gulp.watch('img/**/*', ['img-min']);
	gulp.watch('src/scripts/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'img-min']);
