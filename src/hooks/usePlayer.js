import {useCallback, useState} from 'react';

import {randomTetromino, TETROMINOS} from "../tetrominos";
import {checkCollision, STAGE_WIDTH} from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        nextTetromino: randomTetromino(),
        collided: false,
    });

    const rotate = (matrix, dir) => {
        const rotatedTetromino = matrix.map(
            (_, index) => matrix.map(col => col[index])
        );

        if (dir > 0) {
            return rotatedTetromino.map(row => row.reverse());
        } else {
            return rotatedTetromino.reverse();
        }
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));

        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prevState => ({
            ...prevState,
            pos: {
                x: (prevState.pos.x += x),
                y: (prevState.pos.y += y),
            },
            collided,
        }));
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: player.nextTetromino.shape,
            nextTetromino: randomTetromino(),
            collided: false,
        })
    }, [player.nextTetromino.shape]);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}