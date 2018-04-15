const autoprefixer = require('gulp-autoprefixer'),
babel = require('gulp-babel'),
cleancss = require('gulp-clean-css'),
concat = require('gulp-concat'),
gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
htmlmin = require('gulp-htmlmin'),
notify = require('gulp-notify'),
plumber = require('gulp-plumber'),
rename = require('gulp-rename'),
sass = require('gulp-ruby-sass'),
sourcemaps = require('gulp-sourcemaps'),
svgo = require('gulp-svgo'),
uglify = require('gulp-uglify');

const paths = {
	src: 'src/**/*',
	srcFiles: [
		'src/*.pdf',
		'src/*.xml',
		'src/*.txt',
		'src/*.webmanifest'
	],
	srcJS: 'src/**/*.js',
	srcSCSS: 'src/styles/*.scss',
	srcHTML: 'src/**/*.html',
	srcImg: 'src/img/**/*',

	dist: 'dist',
	distJS: 'dist/js',
	distCSS: 'dist/css',
	distImg: 'dist/img'
};

gulp.task('scripts', () =>
	gulp.src([
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
	.pipe(gulp.dest(paths.distJS))
	.pipe(notify({
		message: 'Scripts Compiled',
		onLast: true
	}))
);

gulp.task('styles', () =>
	sass(paths.srcSCSS, {
		noCache: true,
		style: 'compact',
		sourcemap: true
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
		sourceRoot : paths.srcSCSS
	}))
	.pipe(gulp.dest(paths.distCSS))
	.pipe(notify({
		message: '"Styles" Task Completed'
	}))
);

// Gulp task to minify HTML files
gulp.task('html', () =>
	gulp.src(['./src/**/*.html'])
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true,
		minifyCSS: true
	}))
	.pipe(gulp.dest(paths.dist))
);

gulp.task('img-min', () =>
	gulp.src(paths.srcImg)
	.pipe(plumber())
	.pipe(imagemin([
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng(),
		// imagemin.svgo({
		// 	plugins: [
		// 		{	removeViewBox: false },
		// 		{ minifyStyles: false },
		// 		{	removeUselessStrokeAndFill: false },
		// 		{ removeUselessDefs: false },
		// 		{ cleanupIDs: false }
		// 	]
		// })
	], {verbose: true}))
	.pipe(gulp.dest(paths.distImg))
	.pipe(notify({message: 'image min Task Completed'}))
);

gulp.task('copy', () =>
	gulp.src(paths.srcFiles)
	.pipe(gulp.dest(paths.dist))
);

gulp.task('watch', function() {
	gulp.watch(paths.srcJS, ['scripts']);
	gulp.watch(paths.srcSCSS, ['styles']);
	gulp.watch(paths.srcHTML, ['html']);
	gulp.watch(paths.srcImg, ['img-min']);
	gulp.watch(paths.srcFiles, ['copy']);
});

gulp.task('default', ['scripts', 'styles', 'html', 'img-min', 'copy']);
