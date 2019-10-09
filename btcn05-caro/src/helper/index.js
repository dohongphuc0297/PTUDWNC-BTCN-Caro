import { Size, Line } from '../GameConfig';

const calculateWinner = (index, squares, player) => {
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

export { calculateWinner }