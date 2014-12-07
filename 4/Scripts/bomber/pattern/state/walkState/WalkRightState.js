(function () {
    var WalkRightState = YYC.Class(WalkState_X, {
        Protected: {
            P_setPlayerState: function () {
                this.P_context.setPlayerState(this.P_context.standRightState);
            },
            P_computeTarget: function () {
                var currentCellPos = this.P_context.sprite.getCurrentCellPosition();

                return {
                    x: currentCellPos.x + 1,
                    y: currentCellPos.y
                };
            },
            P_computeTargetByMoving: function () {
                var currentCellPos = this.P_context.sprite.getCellPosition(this.P_context.sprite.getPositionX(), this.P_context.sprite.getPositionY());


                return {
                    x: this.P_context.sprite.moving ? currentCellPos.x + 1 : currentCellPos.x,
                    y: currentCellPos.y
                };
            },
            P_checkBorder: function (target) {
                if (target.x >= window.mapData[0].length) {
                    return true;
                }

                return false;
            },
            P_setDir: function () {
                var sprite = this.P_context.sprite;

                sprite.setAnim("walk_right");
                sprite.dirX = 1;
            },
            P_stop: function () {
                var sprite = this.P_context.sprite;

                sprite.dirX = 0;
            }
        },
        Public: {
            walkRight: function () {
                this.P_checkMapAndSetDir();
            }
        }
    });

    window.WalkRightState = WalkRightState;
}());