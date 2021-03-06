import { Chess } from './chess.js';

import {INPUT_EVENT_TYPE, COLOR, Chessboard, MARKER_TYPE} from "../src/cm-chessboard/Chessboard.js"

const chess = new Chess()

function inputHandler(event) {
    console.log("event", event)
    event.chessboard.removeMarkers(undefined, MARKER_TYPE.dot)
    if (event.type === INPUT_EVENT_TYPE.moveStart) {
        const moves = chess.moves({square: event.square, verbose: true});
        for (const move of moves) {
            event.chessboard.addMarker(move.to, MARKER_TYPE.dot)
        }
        return moves.length > 0
    } else if (event.type === INPUT_EVENT_TYPE.moveDone) {
        const move = {from: event.squareFrom, to: event.squareTo}
        const result = chess.move(move)
        if (result) {
            event.chessboard.disableMoveInput()
            event.chessboard.setPosition(chess.fen())
            const possibleMoves = chess.moves({verbose: true})
            if (possibleMoves.length > 0) {
                const randomIndex = Math.floor(Math.random() * possibleMoves.length)
                const randomMove = possibleMoves[randomIndex]
                setTimeout(() => { // smoother with 500ms delay
                    chess.move({from: randomMove.from, to: randomMove.to})
                    event.chessboard.enableMoveInput(inputHandler, COLOR.white)
                    event.chessboard.setPosition(chess.fen())
                }, 500)
            }
        } else {
            console.warn("invalid move", move)
        }
        return result
    }
}

const board = new Chessboard(document.getElementById("board"), {
    position: chess.fen(),
    sprite: {url: "./assets/images/chessboard-sprite.svg"},
    style: {moveMarker: MARKER_TYPE.square, hoverMarker: undefined},
    orientation: COLOR.white,
})
board.enableMoveInput(inputHandler, COLOR.white)