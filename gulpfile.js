var minify  = require('gulp-minify');
var gulp    = require('gulp');

gulp.task('default', function() {
 gulp.src('src/*.js')
   .pipe(minify({
       ext:{
           src:'.js',
           min:'.min.js'
       },
       exclude: ['tasks'],
       ignoreFiles: ['.combo.js', '-min.js']
   }))
   .pipe(gulp.dest('dist'))
});