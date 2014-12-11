(function () {
    var WalkUpState = YYC.Class(WalkState_Y, {
        Protected: {
            P_setPlayerState: function () {
                this.P_context.setPlayerState(this.P_context.standUpState);
            },
            P_computeTarget: function () {
                var currentCellPos = this.P_context.sprite.getCurrentCellPosition();

                return {
                    x: currentCellPos.x,
                    y: currentCellPos.y - 1
                };
            },
            P_computeTargetByMoving: function () {
                var currentCellPos = this.P_context.sprite.getCellPosition(this.P_context.sprite.x, this.P_context.sprite.y);


                return {
                    x: currentCellPos.x,
                    y: currentCellPos.y
                };
            },
            P_checkBorder: function (target) {
                if (target.y < 0) {
                    return true;
                }

                return false;
            },
            P_setDir: function () {
                var sprite = this.P_context.sprite;

                sprite.setAnim("walk_up");
                sprite.dirY = -1;
            },
            P_stop: function () {
                var sprite = this.P_context.sprite;

                sprite.dirY = 0;
            }
        },
        Public: {
            walkUp: function () {
                this.P_checkMapAndSetDir();
            }
        }
    });

    window.WalkUpState = WalkUpState;
}());