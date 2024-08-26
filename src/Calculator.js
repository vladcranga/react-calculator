import React, { useState, useEffect, useCallback, useMemo } from 'react';

function Calculator() {
    // state hooks
    const [current, setCurrent] = useState('');
    const [previous, setPrevious] = useState('');
    const [operation, setOperation] = useState(undefined);
    const [history, setHistory] = useState([]);

    // calculator logic
    const clear = () => {
        setCurrent('');
        setPrevious('');
        setOperation(undefined);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const deleteNumber = useCallback(() => {
        setCurrent(current.toString().slice(0, -1));
    }, [current]);

    const addNumber = useCallback((number) => {
        if (number === '.' && current.includes('.')) return;
        setCurrent(current.toString() + number.toString());
    }, [current]);

    const MAX_HISTORY_SIZE = 10

    const computeValue = useCallback(() => {
        let result;
        const prev = parseFloat(previous);
        const curr = parseFloat(current);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            case '^':
                result = Math.pow(prev, curr);
                break;
            default:
                return;
        }

        result = parseFloat(result.toFixed(3))

        const newEntry = `${previous} ${operation} ${current} = ${result}`;
        setHistory(history => {
            const updatedHistory = [...history, newEntry];
            if (updatedHistory.length > MAX_HISTORY_SIZE) {
                updatedHistory.shift();
            }
            return updatedHistory;
        });

        setCurrent(result.toString());
        setOperation(undefined);
        setPrevious('');
    }, [current, previous, operation]);

    const squareRoot = useCallback(() => {
        if (current === '') return;
        setCurrent(Math.sqrt(parseFloat(current)).toString());
    }, [current]);

    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const sin = useCallback(() => {
        if (current === '') return;
        setCurrent(Math.sin(parseFloat(toRadians(current))).toString());
    }, [current]);

    const cos = useCallback(() => {
        if (current === '') return;
        setCurrent(Math.cos(parseFloat(toRadians(current))).toFixed(3).toString());
    }, [current]);

    const tan = useCallback(() => {
        if (current === '') return;
        setCurrent(Math.tan(parseFloat(toRadians(current))).toFixed(3).toString());
    }, [current]);

    const chooseOperation = useCallback((op) => {
        if (current === '') return;
        if (previous !== '') {
            computeValue();
        }
        setOperation(op);
        setPrevious(current);
        setCurrent('');
    }, [current, previous, computeValue]);

    // lookup table for key presses
    const keyMap = useMemo(() => ({
        '1': () => addNumber(1),
        '2': () => addNumber(2),
        '3': () => addNumber(3),
        '4': () => addNumber(4),
        '5': () => addNumber(5),
        '6': () => addNumber(6),
        '7': () => addNumber(7),
        '8': () => addNumber(8),
        '9': () => addNumber(9),
        '0': () => addNumber(0),
        '.': () => addNumber('.'),
        ',': () => addNumber('.'),
        '+': () => chooseOperation('+'),
        '-': () => chooseOperation('-'),
        '*': () => chooseOperation('*'),
        '/': () => chooseOperation('÷'),
        '%': () => chooseOperation('÷'),
        '^': () => chooseOperation('^'),
        '=': () => computeValue(),
        'Enter': () => computeValue(),
        'Backspace': () => deleteNumber(),
        'c': () => clear(),
        'C': () => clear()
    }), [addNumber, chooseOperation, computeValue, deleteNumber]);

    // event listener for key presses
    useEffect(() => {
        const handleKeyPress = (event) => {
            const action = keyMap[event.key];
            if (action) action()
        };

        window.addEventListener('keydown', handleKeyPress)

        // clean up the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        };
    }, [keyMap]);

    // html to jsx
    return (
        <div className='grid-calc'>
            <div className='calculator-container'>
                <div className='screen'>
                    <div className='previous'>{previous} {operation}</div>
                    <div className='current'>{current}</div>
                </div>
                <button onClick={squareRoot}>√</button>
                <button className='larger' onClick={clear}>C</button>
                <button onClick={deleteNumber}>DEL</button>
                <button onClick={() => chooseOperation('÷')}>÷</button>
                <button onClick={() => chooseOperation('^')}>^</button>
                <button onClick={() => addNumber('7')}>7</button>
                <button onClick={() => addNumber('8')}>8</button>
                <button onClick={() => addNumber('9')}>9</button>
                <button onClick={() => chooseOperation('*')}>*</button>
                <button onClick={sin}>sin</button>
                <button onClick={() => addNumber('4')}>4</button>
                <button onClick={() => addNumber('5')}>5</button>
                <button onClick={() => addNumber('6')}>6</button>
                <button onClick={() => chooseOperation('-')}>-</button>
                <button onClick={cos}>cos</button>
                <button onClick={() => addNumber('1')}>1</button>
                <button onClick={() => addNumber('2')}>2</button>
                <button onClick={() => addNumber('3')}>3</button>
                <button onClick={() => chooseOperation('+')}>+</button>
                <button onClick={tan}>tan</button>
                <button onClick={() => addNumber('0')}>0</button>
                <button onClick={() => addNumber('.')}>.</button>
                <button className='larger' onClick={computeValue}>=</button>
            </div>

            <div className='history-container'>
                <h2>History</h2>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
                <button className='clear-history-button' onClick={clearHistory}>Clear</button>
            </div>
        </div>
    );
}

export default Calculator