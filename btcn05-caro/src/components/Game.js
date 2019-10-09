import React from 'react';
import Board from './Board';
import { Size } from '../GameConfig';
import { connect } from 'react-redux';
import { ClickSquare, Reset, Toogle, JumpTo } from '../actions/index';
import { calculateWinner } from '../helper/index';

class Game extends React.Component {
    handleClick(i) {
        //console.log(i);
        const history = this.props.history.slice(0, this.props.board.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i]) {
            return;
        }

        const winner = calculateWinner(i, squares, this.props.board.xIsNext ? "X" : "O");

        if (this.props.board.winner) {
            return;
        }
        squares[i] = this.props.board.xIsNext ? "X" : "O";

        this.props.clickSquare({
            history: {
                value: {
                    id: history.length,
                    squares: squares,
                    index: i
                },
                index: this.props.board.stepNumber + 1
        },
            board: {
                stepNumber: this.props.board.stepNumber + 1,
                xIsNext: !this.props.board.xIsNext,
                winner: winner ? winner : null
            }
        })
    }

    jumpTo(step, index) {
        const history = this.props.history.slice();
        const current = history[step];
        const xIsNext = (step % 2) === 0;
        const winner = index ? calculateWinner(index, current.squares, current.squares[index]) : null;
        this.props.jumpTo({
            stepNumber: step,
            xIsNext: xIsNext,
            winner: winner ? winner : null
        })
    }

    Toggle() {
        this.props.toogle();
    }

    reset() {
        this.props.reset();
    }

    render() {
        //console.log(this.props.board);
        const history = this.props.history.slice();

        if (this.props.board.dir === "asc") {
            history.reverse();
        }

        const winner = this.props.board.winner;
        const flag = this.props.board.stepNumber;

        const moves = history.map((step, move) => {
            const desc = step.id ?
                'Go to move #' + step.id + " (" + ((step.index % Size) + 1) + ", " + (Math.floor(step.index / Size) + 1) + ")" :
                'Go to game start';
            const Move = step.id ? step.id : 0;
            return (
                <li key={move}>
                    <button style={(Move === flag) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }} type="button" className="btn btn-default" onClick={() => this.jumpTo(Move, step.index)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner.winner;
        } else if (flag >= (Size * Size)) {
            status = "The match is draw";
        } else {
            status = "Next player: " + (this.props.board.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-info">
                    <button type="button" className="btn btn-default btn-primary" onClick={this.reset.bind(this)}>Reset</button>
                    <div>{status}</div>
                </div>
                <div className="game-frame">
                    <div className="game-board">
                        <Board
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-history">
                        <h3>History</h3>
                        <button type="button" className="btn btn-primary" onClick={() => this.Toggle()}>Toggle <span className="glyphicon glyphicon-sort"></span></button>
                        <ol reversed={this.props.board.dir === "asc" ? true : false}>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    history: state.history,
    board: state.board
  })
  
const mapDispatchToProps = dispatch => ({
    clickSquare: value => dispatch(ClickSquare(value)),
    reset: () => dispatch(Reset()),
    toogle: () => dispatch(Toogle()),
    jumpTo: (value) => dispatch(JumpTo(value))
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game)