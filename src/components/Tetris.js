import React, {useState} from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import {createStage} from "../gameHelpers";

import {StyledTetrisWrapper, StyledTetris} from "./styles/StyledTetris";

import {usePlayer} from "../hooks/usePlayer";
import {useStage} from "../hooks/useStage";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = dir => {
        updatePlayerPos({x: dir, y: 0});
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
        }
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({x: 0, y: 1, collided: false});
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