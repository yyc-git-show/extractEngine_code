(function () {
    var getSpriteData = (function () {
        var data = function () {
            return {
                //玩家精灵数据
                player: {
                    //初始坐标
                    x: bomberConfig.WIDTH * 3,
                    //x: 0,
                    y: bomberConfig.HEIGHT * 19,
                    //定义sprite走路速度的绝对值
                    walkSpeed: bomberConfig.player.speed.NORMAL,


                    minX: 0,
                    maxX: bomberConfig.canvas.WIDTH - bomberConfig.player.IMGWIDTH,
                    minY: 0,
                    maxY: bomberConfig.canvas.HEIGHT - bomberConfig.player.IMGHEIGHT,

                    defaultAnimId: "stand_right"
                },
                //敌人精灵数据
                enemy: {
                    //初始坐标
                    x: bomberConfig.WIDTH * 10,
                    //x: 0,
                    y: bomberConfig.HEIGHT * 3,
                    //定义sprite走路速度的绝对值
                    walkSpeed: bomberConfig.enemy.speed.NORMAL,


                    minX: 0,
                    maxX: bomberConfig.canvas.WIDTH - bomberConfig.player.IMGWIDTH,
                    minY: 0,
                    maxY: bomberConfig.canvas.HEIGHT - bomberConfig.player.IMGHEIGHT,

                    defaultAnimId: "stand_left"
                },
                enemy2: {
                    //初始坐标
                    x: bomberConfig.WIDTH * 10,
                    //x: 0,
                    y: bomberConfig.HEIGHT * 10,
                    //定义sprite走路速度的绝对值
                    walkSpeed: bomberConfig.enemy.speed.NORMAL,


                    minX: 0,
                    maxX: bomberConfig.canvas.WIDTH - bomberConfig.player.IMGWIDTH,
                    minY: 0,
                    maxY: bomberConfig.canvas.HEIGHT - bomberConfig.player.IMGHEIGHT,

                    defaultAnimId: "stand_left"
                }
            }
        };

        return function (spriteName) {
            return data()[spriteName];
        };
    }());

    window.getSpriteData = getSpriteData;
}());