const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const useref = require("gulp-useref");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const miniHtml = require("gulp-htmlmin");
const rename = require("gulp-rename");
const reload = browserSync.reload;
const cleanCSS = require("gulp-clean-css");

// gulp.task("sass", async function() {
// 	return gulp.src("src/sass/**/*.sass")
// 		.pipe(sass())
// 		.pipe(rename("style.min.css"))
// 		.pipe(cleanCSS())
// 		.pipe(gulp.dest("public/css"))
// });

gulp.task("watch", async function() {
	gulp.watch('src/sass/*.sass', gulp.series('sass'));
    gulp.watch('public/css/*.css').on('change', reload);

    gulp.watch('src/*.html', gulp.series('html'));
	gulp.watch('public/*.html').on('change', reload);
});

gulp.task("browserSync", async function() {
	browserSync.init({
        server: {
            baseDir: "./public/"
        }
	});
});

gulp.task("js", async () => {
    gulp.src([
            'src/js/bootstrap.min.js',
            'src/js/tota11y.min.js',
            'src/js/event.js',
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task("html", async () => {
    gulp.src('src/*.html') // source files
        .pipe(miniHtml({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('public')); // destination
});

gulp.task("default",gulp.series("html","js"));