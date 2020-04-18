const gulp = require('gulp');
const del = require("del");
const htmlreplace = require('gulp-html-replace');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gulpif = require("gulp-if");
const uglify = require('gulp-uglify-es').default;
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolveNodeModules = require ('rollup-plugin-node-resolve');  //falls node js verwendet werden, bei plugins nach babel hinzufügen
const rename = require('gulp-rename');


let isProductionBuild = false;


function runSass() {
    return gulp
      .src('app/scss/**/*.scss')
      .pipe(sass()) // Konvertiere Sass zu CSS mit gulp-sass
      .pipe(autoprefixer(
//          {grid: "autoplace"}  //standardmässig wird grid nicht geprefixt. hier wirds aktiviert wenns im code verwendet wird
      ))
      .pipe(gulpif(isProductionBuild,cssnano())) // Minify css wenn ProductionBild true
      .pipe(gulpif(isProductionBuild, rename({
          suffix: ".min",
      })))
      .pipe(gulpif(isProductionBuild, gulp.dest("dist/css/"), gulp.dest('app/dev'))) // wenn ProductionBuild in dist, sonst dev
      .pipe(browserSync.stream())
  }
  

function bundleJS() {
return gulp
    .src("app/js/app.js")
    .pipe(rollup({
        plugins: [babel(), resolveNodeModules()],
        },
        { format: "cjs" }
    ))
    .pipe(gulpif(isProductionBuild, uglify()))
    .pipe(gulpif(isProductionBuild, rename({
        suffix: ".min",
        }),
        rename({
        suffix: "-bundle",
        })
    ))
    .pipe(gulpif(isProductionBuild, gulp.dest("dist/js/"), gulp.dest("app/dev/"))
    );
}


function copyImages() {
    return gulp.src("app/img/*.(gif|jpg|png)").pipe(gulp.dest("dist/img/"));
}

  
function copyHtml() {
    return gulp
        .src("app/**/*.html")
        .pipe(
            htmlreplace({
                js: "js/app.min.js",
                css: "css/main.min.css",
            })
        )
        .pipe(gulp.dest("dist/"));
}


function runClean(done) {
    del.sync("dist");
    done();
}


function startProductionBuild(done) {
    isProductionBuild = true;
    done();
}  


function reload(cb){
    browserSync.reload();
    cb();
}


function runWatch() {
    startBrowserSync();
    gulp.watch('app/scss/**/*.scss', runSass);
    gulp.watch('app/**/*.html', reload);
    gulp.watch(
        ['app/js/**/*.js', "!app/js/**/*-bundle.js"], 
        gulp.series(bundleJS, reload)
    );
}


function startBrowserSync() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
}


gulp.task('sass', runSass);
gulp.task("sass:build", gulp.series(startProductionBuild, runSass));
gulp.task('bundle', bundleJS);
gulp.task("bundle:build", gulp.series(startProductionBuild, bundleJS));
gulp.task('watch', gulp.series(runSass, bundleJS, runWatch));  // series führt die in klammer stehenden Funktionen nacheinancher aus
gulp.task("build", gulp.series(startProductionBuild, runClean,
      gulp.parallel(copyHtml, runSass, bundleJS))
);