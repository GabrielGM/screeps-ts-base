var gulp = require('gulp');
var del = require('del');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var change = require('gulp-change');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var renameRequires = [];

gulp.task('default', ['cleanup'], function(){

});

gulp.task('cleanup', ['compile'], function(){
    return del([
        ".tmp"
    ]);
});

gulp.task('compile', ['flatten'], function(){
    del([
        "dist/**/*"
    ]);

    return gulp.src('.tmp/s2/*.js')
        .pipe(change(function(content){
            for(i=0; i<renameRequires.length; i++){
                content = content.replace("require('" + renameRequires[i][0] + "')", "require('" + renameRequires[i][1] + "')")
            }

            return content;
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('flatten', ['tscompile'], function(){
    return gulp.src('.tmp/s1/**/*')
        .pipe(rename(function(path){
            if(!!path.extname && path.dirname !== '.')
            {
                let newBaseName = path.dirname.replace('/', '.') + '.' + path.basename;
                let oldRequire = path.basename;
                let newRequire = newBaseName;
                
                renameRequires.push([oldRequire, newRequire]);

                path.basename = newBaseName;
                path.dirname = '.';
            }
        }))
        .pipe(change(function(content){
            return content;
        }))
        .pipe(flatten())
        .pipe(gulp.dest('.tmp/s2'));
});

gulp.task('tscompile', function(){
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('.tmp/s1'));
});