import React, {useState} from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import NextTetromino from "./NextTetromino";

import {createStage, checkCollision} from "../gameHelpers";

import {StyledTetrisWrapper, StyledTetris} from "./styles/StyledTetris";

import {usePlayer} from "../hooks/usePlayer";
import {useStage} from "../hooks/useStage";
import {useInterval} from "../hooks/useInterval";
import {useGameStatus} from "../hooks/useGameStatus";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);


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
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const updateDropTime = () => {
        setDropTime(1000 / (level + 1) + 200);
    }

    const drop = () => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            updateDropTime();
        }

        if (!checkCollision(player, stage, {x: 0, y: 1})) {
            updatePlayerPos({x: 0, y: 1, collided: false});
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
                return;
            }
            updatePlayerPos({x: 0, y: 0, collided: true});
        }
    }

    const keyUp = ({keyCode}) => {
        if (gameOver) {
            return;
        }

        if (keyCode === 40) {
            updateDropTime();
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper
            role={"button"}
            tabIndex={0}
            onKeyDown={e => move(e)}
            onKeyUp={e => keyUp(e)}
        >
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    <NextTetromino nextTetromino={player.nextTetromino}/>
                    <div>
                        <Display text={`Score: ${score}`}/>
                        <Display text={`Rows: ${rows}`}/>
                        <Display text={`Level: ${level}`}/>
                        {gameOver && <Display gameOver={gameOver} text={"Game Over"}/>}
                    </div>

                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;