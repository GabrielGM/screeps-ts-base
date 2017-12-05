///<reference path="../.typings/screeps.d.ts" />

var GameManager = require('game.manager');
//declare var module: any;

GameManager.initialize();

// This doesn't look really nice, but Screeps' system expects this method in main.js to run the application.
// If we have this line, we can make sure that globals bootstrap and game loop work.
// http://support.screeps.com/hc/en-us/articles/204825672-New-main-loop-architecture
module.exports.loop = function() {
    GameManager.run();
};