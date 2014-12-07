/**YEngine2D
 * 作者：YYC
 * 日期：2014-01-06
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var director = YE.Director.getInstance();

    var Scene = YYC.Class(YE.Scene, {
        Private: {
//            _initScene: function () {
//                this._addLayer();
//                this._addElements();
//                this._initEvent();
//            },
            _addLayer: function () {
                this.addLayer("mapLayer", layerFactory.createMap());
                this.addLayer("enemyLayer", layerFactory.createEnemy());
                this.addLayer("playerLayer", layerFactory.createPlayer());
                this.addLayer("bombLayer", layerFactory.createBomb());
                this.addLayer("fireLayer", layerFactory.createFire());
            },
            _addElements: function () {
                this.getLayer("mapLayer").addChilds(this._createMapLayerElement());
                this.getLayer("playerLayer").addChilds(this._createPlayerLayerElement());
                this.getLayer("enemyLayer").addChilds(this._createEnemyLayerElement());
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
                        img = window.imgLoader.get("ground");
                        break;
                    case 2:
                        img = window.imgLoader.get("wall");
                        break;
                    default:
                        break
                }

                return img;
            },
            _createPlayerLayerElement: function () {
                var element = [],
                    player = spriteFactory.createPlayer();

                element.push(player);

                return element;
            },
            _createEnemyLayerElement: function () {
                var element = [],
                    enemy = spriteFactory.createEnemy(),
                    enemy2 = spriteFactory.createEnemy2();

                element.push(enemy);
                element.push(enemy2);

                return element;
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
            _judgeGameState: function () {
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
            },
            _gameOver: function () {
                director.stop();
                console.log("Game Over！");
            },
            _gameWin: function () {
                director.stop();
                console.log("You Win！");
            }
        },
        Public: {
            initData: function () {
                //初始化游戏全局状态
                window.gameState = window.bomberConfig.game.state.NORMAL;

                window.subject = new YYC.Pattern.Subject();

                this._addLayer();
                this._addElements();
                this._initEvent();

                window.subject.subscribe(this.getLayer("mapLayer"), this.getLayer("mapLayer").changeSpriteImg);
            },
            onStartLoop: function () {
                this._judgeGameState();
            }
        }
    });

    window.Scene = Scene;
}());