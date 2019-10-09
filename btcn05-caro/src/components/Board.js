import React from 'react';
import Square from './Square';
import { Size, Line } from '../GameConfig';
import { connect } from 'react-redux';

class Board extends React.Component {
    renderSquare(i) {
        const win = this.props.win;
        const check = win ? this.IsWinSquare(i, win) : false;
        return (
            <Square
                key={i}
                style={{ fontWeight: (check ? "bold" : "normal"), background: (check ? 'rgb(252, 62, 62)' : '#fff') }}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    IsWinSquare(a, win) {
        for (let i = 0; i < Line; i++) {
            if (a === win[i]) return true;
        }
    }

    render() {
        var row = [];
        for(let i = 0; i < Size; i++){
            var Sq = [];
            for(let j = 0; j < Size; j++){
                Sq.push(this.renderSquare(i * Size + j));
            }
            row.push(<div className="board-row" key={'row_' + i}>
            <button
                className="square col-index">
                {i + 1}
            </button>
            {Sq}
        </div>);
        }

        var CR = [<button
            key={0}
            className="square col-index">
        </button>];
        for(let i = 1; i <= Size; i++){
            CR.push(<button
                key={i}
                className="square col-index">
                {i}
            </button>);
        }
        return (
            <div>
                <div className="board-row">
                    {CR}
                </div>
                {row}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    squares: state.history[state.board.stepNumber].squares,
    win: state.board.winner ? state.board.winner.line : null
  })

export default connect(
    mapStateToProps,
    null
  )(Board)