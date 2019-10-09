import React from 'react';
import Board from './Board';
import { Size, Line } from '../GameConfig';
import { connect } from 'react-redux';
import { ClickSquare, Reset, Toogle, JumpTo } from '../actions/index';

class Game extends React.Component {
    calculateWinner(index, squares, player) {
        var countBlock = 0;
        var result = [index];
        //check 1
        //XOO
        //OXO
        //OOX
        //check up
        var count = 1;
        if (index >= (Size + 1) && index < (Size * Size) && index % Size !== 0) {
            for (let i = index - (Size + 1); count <= (Line - 1) || i < 0; i = i - (Size + 1)) {
                if (squares[i] === player) result.push(i);
                else break;
                if (i % Size === 0) break;
            }
        }
        //check down
        count = 1;
        if (index < (Size * Size - Size) && (index + 1) % Size !== 0) {
            for (let i = index + (Size + 1); count <= (Line - 1) || i >= (Size * Size); i = i + (Size + 1)) {
                if (squares[i] === player) result.push(i);
                else break;
                if ((i + 1) % Size === 0) break;
            }
        }

        if (result.length === Line) {
            countBlock = 0;
            result.sort(function compareNumbers(a, b) {
                return a - b;
            });

            if (result[0] > Size || result[0] % Size !== 0) {
                if (squares[result[0] - (Size + 1)] !== player && squares[result[0] - (Size + 1)] !== null)
                    countBlock++;
            }

            if (result[result.length - 1] < (Size * Size - Size) || (result[result.length - 1] + 1) % Size !== 0) {
                if (squares[result[result.length - 1] + (Size + 1)] !== player && squares[result[result.length - 1] + (Size + 1)] !== null)
                    countBlock++;
            }

            if (countBlock < 2)
                return { line: result, winner: player };
        }

        result = [index];
        //check 2
        //OXO
        //OXO
        //OXO
        //check up
        count = 1;
        if (index >= Size && index < (Size * Size)) {
            for (let i = index - Size; count <= (Line - 1) || i < 0; i = i - Size) {
                if (squares[i] === player) result.push(i);
                else break;
            }
        }
        //check down
        count = 1;
        if (index < 380) {
            for (let i = index + Size; count <= (Line - 1) || i >= (Size * Size); i = i + Size) {
                if (squares[i] === player) result.push(i);
                else break;
            }
        }

        if (result.length === Line) {
            countBlock = 0;
            result.sort(function compareNumbers(a, b) {
                return a - b;
            });

            if (result[0] >= Size) {
                if (squares[result[0] - Size] !== player && squares[result[0] - Size] !== null)
                    countBlock++;
            }

            if (result[result.length - 1] < (Size * Size - Size)) {
                if (squares[result[result.length - 1] + Size] !== player && squares[result[result.length - 1] + Size] !== null)
                    countBlock++;
            }

            if (countBlock < 2)
                return { line: result, winner: player };
        }

        result = [index];
        //check 3
        //OOX
        //OXO
        //XOO
        //check up
        count = 1;
        if (index >= Size && index <= (Size * Size - 2) && (index + 1) % Size !== 0) {
            for (let i = index - (Size - 1); count <= (Line - 1) || i < 0; i = i - (Size - 1)) {
                if (squares[i] === player) result.push(i);
                else break;
                if ((i + 1) % Size === 0) break;
            }
        }
        //check down
        count = 1;
        if (index < (Size * Size - Size) && index % Size !== 0) {
            for (let i = index + (Size - 1); count <= (Line - 1) || i >= (Size * Size); i = i + (Size - 1)) {
                if (squares[i] === player) result.push(i);
                else break;
                if (i % Size === 0) break;
            }
        }

        if (result.length === Line) {
            countBlock = 0;
            result.sort(function compareNumbers(a, b) {
                return a - b;
            });

            if (result[0] >= Size || (result[0] + 1) % Size !== 0) {
                if (squares[result[0] - (Size - 1)] !== player && squares[result[0] - (Size - 1)] !== null)
                    countBlock++;
            }

            if (result[result.length - 1] < (Size * Size - Size) || result[result.length - 1] % Size !== 0) {
                if (squares[result[result.length - 1] + (Size - 1)] !== player && squares[result[result.length - 1] + (Size - 1)] !== null)
                    countBlock++;
            }

            if (countBlock < 2)
                return { line: result, winner: player };
        }

        result = [index];
        //check 4
        //OOO
        //XXX
        //OOO
        //check left
        count = 1;
        if (index % Size !== 0 && index < (Size * Size)) {
            for (let i = index - 1; count <= (Line - 1) || i < 0; i--) {
                if (squares[i] === player) result.push(i);
                else break;
                if (i % Size === 0) break;
            }
        }
        //check right
        count = 1;
        if ((index + 1) % Size !== 0 && index < (Size * Size)) {
            for (let i = index + 1; count <= (Line - 1) || i >= (Size * Size); i = i + 1) {
                if (squares[i] === player) result.push(i);
                else break;
                if ((i + 1) % Size === 0) break;
            }
        }

        if (result.length === Line) {
            countBlock = 0;
            result.sort(function compareNumbers(a, b) {
                return a - b;
            });

            if (result[0] % Size !== 0) {
                if (squares[result[0] - 1] !== player && squares[result[0] - 1] !== null)
                    countBlock++;
            }

            if (result[result.length - 1] < (Size * Size - Size) && (result[result.length - 1] + 1) % Size !== 0) {
                if (squares[result[result.length - 1] + 1] !== player && squares[result[result.length - 1] + 1] !== null)
                    countBlock++;
            }

            if (countBlock < 2)
                return { line: result, winner: player };
        }

        return null;
    }

    handleClick(i) {
        //console.log(i);
        const history = this.props.history.slice(0, this.props.board.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i]) {
            return;
        }

        const winner = this.calculateWinner(i, squares, this.props.board.xIsNext ? "X" : "O");

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
        const winner = index ? this.calculateWinner(index, current.squares, current.squares[index]) : null;
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
        const current = history[this.props.board.stepNumber];

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
                            squares={current.squares}
                            win={winner ? winner.line : null}
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