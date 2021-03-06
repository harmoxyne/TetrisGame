export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const NEXT_TETROMINO_STAGE_HEIGHT = 5;
export const NEXT_TETROMINO_STAGE_WIDTH = 5;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), createEmptyRow);

export const createEmptyRow = () =>
    new Array(STAGE_WIDTH).fill([0, 'clear']);

export const createNextTetrominoStage = () => Array.from(Array(NEXT_TETROMINO_STAGE_HEIGHT),
    () => new Array(NEXT_TETROMINO_STAGE_WIDTH).fill([0])
);

export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            if (player.tetromino[y][x] === 0) {
                continue;
            }

            if (
                !stage[y + player.pos.y + moveY]
                || !stage[y + player.pos.y + moveY][x + player.pos.x + moveX]
                || stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1]
                !== 'clear'
            ) {
                return true;
            }
        }
    }

    return false;
}