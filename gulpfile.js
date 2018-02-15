'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
			notify = require("gulp-notify"),
			plumber = require('gulp-plumber'),
			autoprefixer = require('gulp-autoprefixer');
      // svgstore = require("gulp-svgstore");

			gulp.task('sass', function() {
          return gulp.src('./scss/**/*.scss') // Берем источник
          .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
          .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
          .pipe(autoprefixer({
            browsers: ['last 3 versions', "> 2%"],
            cascade: false
          }))
          .pipe(gulp.dest('./css'))
          .pipe(notify('Sass is compile!'));
      });

      gulp.task('pug', function() {
        return gulp.src('./*.pug')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    		.pipe(pug({pretty: '\t'}))
    		.pipe(gulp.dest("./"))
    		.pipe(notify('Pug is compile!'));
      });

			gulp.task('watch', function(){
				gulp.watch('./scss/**/*.scss', ['sass']);
        gulp.watch('./*.pug', ['pug']);
			});

      // gulp.task("sprite", function () {
      //   return gulp.src("img/icon-*.svg")
      //     .pipe(svgstore({
      //       inlineSvg: true
      //     }))
      //     .pipe(rename("sprite.svg"))
      //     .pipe(gulp.dest("img"));
      // });

      gulp.task('default', ['sass', 'pug', 'watch']);
