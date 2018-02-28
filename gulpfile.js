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
      svgsprite = require('gulp-svg-sprite'),
      uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src([
        'src/scripts/*.js'
    ])
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(babel({
        presets: ['es2015']
    }))
    // .pipe(uglify())
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
        sourceRoot: '/src/scss'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({
        message: '"Styles" Task Completed'
    }));
});

gulp.task('svg-sprite', function() {
    const config = {
        mode: {
            symbol: { // symbol mode to build the SVG
                render: {
                    scss: {
                        dest: '../src/scss/partial/_iconography.scss'
                    }
                },
                prefix: '.u-icon-%s',
                sprite: '../images/sprite-ui.svg', //generated sprite name
            }
        }
    };

    gulp.src('images/svg/*.svg', {
        cwd: ''
    })
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(svgsprite(config))
    .pipe(gulp.dest(''))
    .pipe(notify({
        message: '"SVG Sprite" Task Completed'
    }));
});


gulp.task('watch', function() {
    gulp.watch(['src/*.scss', 'src/**/*.scss'], ['styles']);
    gulp.watch('images/svg/*.svg', ['svg-sprite']);
    gulp.watch('src/scripts/*.js', ['scripts']);

});

gulp.task( 'default', [ 'styles', 'scripts', 'svg-sprite'] );
