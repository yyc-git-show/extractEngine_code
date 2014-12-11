(function () {
    var spriteFactory = {
        createMapElement: function (data, bitmap) {
            return new MapElementSprite(data, bitmap);
        },
        createPlayer: function () {
            return new PlayerSprite(getSpriteData("player"), bitmapFactory.createBitmap({ img: YE.Main.getInstance().getImg("player"), width: bomberConfig.player.IMGWIDTH, height: bomberConfig.player.IMGHEIGHT}));
        },
        createEnemy: function () {
            return new EnemySprite(getSpriteData("enemy"), bitmapFactory.createBitmap({ img: YE.Main.getInstance().getImg("enemy"), width: bomberConfig.player.IMGWIDTH, height: bomberConfig.player.IMGHEIGHT}));
        },
        createEnemy2: function () {
            return new EnemySprite(getSpriteData("enemy2"), bitmapFactory.createBitmap({ img: YE.Main.getInstance().getImg("enemy"), width: bomberConfig.player.IMGWIDTH, height: bomberConfig.player.IMGHEIGHT }));
        },
        createBomb: function (playerSprite) {
            return new BombSprite(playerSprite, bitmapFactory.createBitmap({ img: YE.Main.getInstance().getImg("bomb"), width: bomberConfig.WIDTH, height: bomberConfig.HEIGHT }));
        },
        createFire: function () {
            return new FireSprite(null, bitmapFactory.createBitmap({ img: YE.Main.getInstance().getImg("fire"), width: bomberConfig.WIDTH, height: bomberConfig.HEIGHT }));
        },
        createExplode: function () {
            return new FireSprite(null, bitmapFactory.createBitmap({ img: YE.Main.getInstance().getImg("explode"), width: bomberConfig.WIDTH, height: bomberConfig.HEIGHT }));
        }
    }

    window.spriteFactory = spriteFactory;
}());