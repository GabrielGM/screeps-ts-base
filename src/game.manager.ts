var Harvester = require('harvester');

var gameManager = {
    /**
     * Initialize the game manager
     */
    initialize(){

    },
    
    /**
     * Run the game. Use inside main loop.
     */
    run(){

        var spawn = Game.spawns['Spawn1'];
        if(spawn.energy >=200){
            spawn.createCreep([WORK, CARRY, MOVE], 'Harv' + Game.time.toString());
        }

        for(var creepName in Game.creeps)
        {
            var creep = Game.creeps[creepName];
            Harvester.doWork(creep);
        }
    }
}

module.exports = gameManager;