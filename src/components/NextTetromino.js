import React from "react";
import {StyledNextTetromino} from "./styles/StyledNextTetromino";
import Cell from "./Cell";
import {createNextTetrominoStage} from "../gameHelpers";

const NextTetromino = ({nextTetromino}) => {
    const nextTetrominoStage = createNextTetrominoStage().map((row, y) => row.map(
        (_, x) => {
            let type;
            if (nextTetromino.shape[y] !== undefined
                && nextTetromino.shape[y][x] !== undefined
                && nextTetromino.shape[y][x] !== 0
            ) {
                type = nextTetromino.name;
            } else {
                type = 0;
            }
            return <Cell type={type} key={x}/>;
        }
    ));

    return (<StyledNextTetromino width={nextTetrominoStage[0].length} height={nextTetrominoStage.length}>
        {nextTetrominoStage}
    </StyledNextTetromino>)
};

export default React.memo(NextTetromino);