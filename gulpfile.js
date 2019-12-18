'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const rename =  require('gulp-rename');
const tildeImporter = require('node-sass-tilde-importer');

const sassSrc = `./src/styles/**/*.scss`;

gulp.task(
    'clean',

    () => gulp.src('dist/*').pipe(clean()),
);

gulp.task(
    'copy',

    () =>
        gulp.src(['./src/styles/**/*'], { base: './src/styles' })
            .pipe(gulp.dest('./dist/themes')),
);

gulp.task(
    'minify',

    () =>
        gulp.src(['./dist/**/*.css', '!./dist/**/*.min.css'])
            .pipe(cleanCSS())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('./dist')),
);

gulp.task(
    'sass',

    () =>
        gulp.src([sassSrc])
            .pipe(sass({ importer: tildeImporter }).on('error', sass.logError))
            .pipe(gulp.dest(`./dist/styles`))
);

gulp.task('sass:themes', gulp.series(['clean', 'sass', 'minify', 'copy']));
gulp.task('sass:themes:watch', () => gulp.watch(sassSrc, gulp.series(['sass:themes'])));
