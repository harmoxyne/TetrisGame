import React, {useState} from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import {createStage, checkCollision} from "../gameHelpers";

import {StyledTetrisWrapper, StyledTetris} from "./styles/StyledTetris";

import {usePlayer} from "../hooks/usePlayer";
import {useStage} from "../hooks/useStage";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, {x: dir, y: 0})) {
            updatePlayerPos({x: dir, y: 0});
        }
    }

    const move = ({keyCode}) => {
        if (gameOver) {
            return;
        }

        switch (keyCode) {
            case 37:
                // left arrow
                movePlayer(-1);
                break;
            case 39:
                // right arrow
                movePlayer(1);
                break;
            case 40:
                // down arrow
                dropPlayer();
                break;
            case 38:
                // up arrow
                playerRotate(stage, 1);
                break;
            default:
                break;
        }
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, {x: 0, y: 1})) {
            updatePlayerPos({x: 0, y: 1, collided: false});
        } else {
            if (player.pos.y < 1) {
                console.log("Game Over");
                setGameOver(true);
                setDropTime(null);
                return;
            }
            updatePlayerPos({x: 0, y: 0, collided: true});
        }
    }

    const dropPlayer = () => {
        drop();
    }

    return (
        <StyledTetrisWrapper role={"button"} tabIndex={0} onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text={"Game Over"}/>
                    ) : (
                        <div>
                            <Display text={"Score"}/>
                            <Display text={"Rows"}/>
                            <Display text={"Level"}/>
                        </div>
                    )
                    }
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;