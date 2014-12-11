﻿(function () {
    var main = YE.Main.getInstance();

    var _getImg = function () {
        var urls = [];
        var i = 0, len = 0;

        var map = [
            { id: "ground", url: getImages("ground") },
            { id: "wall", url: getImages("wall") }
        ];
        var player = [
            { id: "player", url: getImages("player") }
        ];
        var enemy = [
            { id: "enemy", url: getImages("enemy") }
        ];
        var bomb = [
            { id: "bomb", url: getImages("bomb") },
            { id: "explode", url: getImages("explode") },
            { id: "fire", url: getImages("fire") }
        ];

        _addImg(urls, map, player, enemy, bomb);

        return urls;
    };

    var _addImg = function (urls, imgs) {
        var args = Array.prototype.slice.call(arguments, 1),
            i = 0,
            j = 0,
            len1 = 0,
            len2 = 0;

        for (i = 0, len1 = args.length; i < len1; i++) {
            for (j = 0, len2 = args[i].length; j < len2; j++) {
                urls.push({ id: args[i][j].id, url: args[i][j].url });
            }
        }
    };

    var _hideBar = function () {
        $("#progressBar").css("display", "none");
    };

    main.loadResource = function () {
        this.load(_getImg());
    };
    main.onloading = function (currentLoad, imgCount) {
        $("#progressBar_img_show").progressBar(parseInt(currentLoad * 100 / imgCount, 10));     //调用进度条插件
    };
    main.onload = function () {
        _hideBar();
    };
}());
