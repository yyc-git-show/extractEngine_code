(function () {
    var WalkDownState = YYC.Class(WalkState_Y, {
        Protected: {
            P_setPlayerState: function () {
                this.P_context.setPlayerState(this.P_context.standDownState);
            },
            P_computeTarget: function () {
                var currentCellPos = this.P_context.sprite.getCurrentCellPosition();

                return {
                    x: currentCellPos.x,
                    y: currentCellPos.y + 1
                };
            },
            P_computeTargetByMoving: function () {
                var currentCellPos = this.P_context.sprite.getCellPosition(this.P_context.sprite.getPositionX(), this.P_context.sprite.getPositionY());


                return {
                    x: currentCellPos.x,
                    y: this.P_context.sprite.moving ? currentCellPos.y + 1 : currentCellPos.y
                };
            },
            P_checkBorder: function (target) {
                if (target.y >= window.mapData.length) {
                    return true;
                }

                return false;
            },
            P_setDir: function () {
                var sprite = this.P_context.sprite;

                sprite.setAnim("walk_down");
                sprite.dirY = 1;
            },
            P_stop: function () {
                var sprite = this.P_context.sprite;

                sprite.dirY = 0;
            }
        },
        Private: {
        },
        Public: {
            walkDown: function () {
                try {
                    this.P_checkMapAndSetDir();
                }
                catch (e) {
                    var t = this.P_checkMapAndSetDir();
                    var m = 1;

                }
                finally {
                }
            }
        }
    });

    window.WalkDownState = WalkDownState;
}());