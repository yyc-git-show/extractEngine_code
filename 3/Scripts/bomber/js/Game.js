(function () {
    var director = YE.Director.getInstance();

    var Game = YYC.Class({
        Init: function () {
        },
        Private: {
            _createScene: function () {
                this.scene = new YE.Scene();
                this.scene.addLayer("mapLayer", layerFactory.createMap());
                this.scene.addLayer("enemyLayer", layerFactory.createEnemy(this.sleep));
                this.scene.addLayer("playerLayer", layerFactory.createPlayer(this.sleep));
                this.scene.addLayer("bombLayer", layerFactory.createBomb());
                this.scene.addLayer("fireLayer", layerFactory.createFire());
            },
            _addElements: function () {
                var mapLayerElements = this._createMapLayerElement(),
                    playerLayerElements = this._createPlayerLayerElement(),
                    enemyLayerElements = this._createEnemyLayerElement();

                this.scene.addSprites("mapLayer", mapLayerElements);
                this.scene.addSprites("playerLayer", playerLayerElements);
                this.scene.addSprites("enemyLayer", enemyLayerElements);
            },
            //创建并设置每个地图方格精灵，加入到元素数组中并返回。
            _createMapLayerElement: function () {
                var i = 0,
                    j = 0,
                    x = 0,
                    y = 0,
                    row = bomberConfig.map.ROW,
                    col = bomberConfig.map.COL,
                    element = [],
                    mapData = mapDataOperate.getMapData(),
                    img = null;

                for (i = 0; i < row; i++) {
                    //注意！
                    //y为纵向height，x为横向width
                    y = i * bomberConfig.HEIGHT;

                    for (j = 0; j < col; j++) {
                        x = j * bomberConfig.WIDTH;
                        img = this._getMapImg(i, j, mapData);
                        element.push(spriteFactory.createMapElement({ x: x, y: y }, bitmapFactory.createBitmap({ img: img, width: bomberConfig.WIDTH, height: bomberConfig.HEIGHT })));
                    }
                }

                return element;
            },
            _getMapImg: function (i, j, mapData) {
                var img = null;

                switch (mapData[i][j]) {
                    case 1:
                        img = YE.Main.getInstance().getImg("ground");
                        break;
                    case 2:
                        img = YE.Main.getInstance().getImg("wall");
                        break;
                    default:
                        break
                }

                return img;
            },
            _createPlayerLayerElement: function () {
                var element = [],
                    player = spriteFactory.createPlayer();

                player.init();
                element.push(player);

                return element;
            },
            _createEnemyLayerElement: function () {
                var element = [],
                    enemy = spriteFactory.createEnemy(),
                    enemy2 = spriteFactory.createEnemy2();

                enemy.init();
                enemy2.init();
                element.push(enemy);
                element.push(enemy2);

                return element;
            },
            _initLayer: function () {
                this.scene.initLayer();
            },
            _initEvent: function () {
                //监听整个document的keydown,keyup事件
                YE.EventManager.addListener(YE.Event.KEY_DOWN, function (e) {
                    window.keyState[e.keyCode] = true;

                    e.preventDefault();
                });
                YE.EventManager.addListener(YE.Event.KEY_UP, function (e) {
                    window.keyState[e.keyCode] = false;
                });
            },
            _gameOver: function () {
                director.stop();
                alert("Game Over！");
            },
            _gameWin: function () {
                director.stop();
                alert("You Win！");
            }
        },
        Public: {
            sleep: 0,
            scene: null,

            init: function () {
                //初始化游戏全局状态
                window.gameState = window.bomberConfig.game.state.NORMAL;

                window.subject = new YYC.Pattern.Subject();

                this.sleep = 1000 / director.getFps();


                this._createScene();
                this._addElements();
                this._initLayer();
                this._initEvent();

                window.subject.subscribe(this.scene.getLayer("mapLayer"), this.scene.getLayer("mapLayer").changeSpriteImg);
            },
            judgeGameState: function () {
                switch (window.gameState) {
                    case window.bomberConfig.game.state.NORMAL:
                        break;
                    case window.bomberConfig.game.state.OVER:
                        this._gameOver();
                        return "over";
                        break;
                    case window.bomberConfig.game.state.WIN:
                        this._gameWin();
                        return "over";
                        break;
                    default:
                        throw new Error("未知的游戏状态");
                }
                return false;
            }
        }
    });

    var game = new Game();

    director.init = function () {
        game.init();

        //设置场景
        this.setScene(game.scene);
    };
    director.onStartLoop = function () {
        game.judgeGameState();
    };
}());
