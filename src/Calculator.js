import React, { useState, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { calculate } from './api';

/** 
 * This component renders a calculator with support for arithmetic operations,
 * special functions, and calculation history. It interacts with an API for
 * performing operations and maintains a history of calculations.
*/
function Calculator() {
    // state hooks
    const [current, setCurrent] = useState('');
    const [previous, setPrevious] = useState('');
    const [operation, setOperation] = useState(undefined);
    const [history, setHistory] = useState([]);

    // clear the current input
    const clear = () => {
        setCurrent('');
        setPrevious('');
        setOperation(undefined);
    };

    // clear the calculation history
    const clearHistory = () => {
        setHistory([]);
    };

    // the maximum number of displayed history entries
    const MAX_HISTORY_SIZE = 10

    
    /**
     * Updates the calculation history.
     * @param {string} operationType - The operation performed.
     * @param {number} num1 - The first operand.
     * @param {number|null} num2 - The second operand.
     * @param {number} result - The result of the calculation.
    */
    const updateHistory = (operationType, num1, num2, result) => {
        const historyEntry = num2 !== null
            ? `${num1} ${operationType} ${num2} = ${result}`
            : `${operationType}(${num1}) = ${result}`;
    
        setHistory((prevHistory) => {
            const updatedHistory = [historyEntry, ...prevHistory];
            return updatedHistory.length > MAX_HISTORY_SIZE 
                ? updatedHistory.slice(0, MAX_HISTORY_SIZE)
                : updatedHistory;
        });
    };

    /**
     * Deletes the last digit or character from the current input.
    */
    const deleteNumber = useCallback(() => {
        setCurrent(current.toString().slice(0, -1));
    }, [current]);

    /**
     * Adds a number to the current input.
     * @param {string} number - The number to add to the current input.
    */
    const addNumber = useCallback((number) => {
        if (number === '.' && current.includes('.')) return;
        setCurrent(current.toString() + number.toString());
    }, [current]);

    /**
     * Performs a regular arithmetic operation.
    */
    const computeRegularOperation = debounce(async () => {
        if (current === '' || previous === '') {
            alert('Enter two numbers and an operation before calculating.');
            return;
        }

        try {
            const num1 = parseFloat(previous);
            const num2 = parseFloat(current);
            const result = await calculate(operation, num1, num2);
            const formattedResult = Number.isInteger(result) 
                ? result : result.toFixed(3);

            setCurrent(formattedResult);
            setPrevious('');
            setOperation(undefined);

            updateHistory(operation, num1, num2, formattedResult);
        } 
        
        catch (error) {
            console.error('Error during calculation:', error);
        }
    }, 500);

    const chooseOperation = useCallback((op) => {
        if (current === '') return;
        if (previous !== '') {
            computeRegularOperation();
        }
        setOperation(op);
        setPrevious(current);
        setCurrent('');
    }, [current, previous, computeRegularOperation]);

    /**
     * Performs a special operation.
    */
    const computeSpecialOperation = debounce (async (operationType) => {
        if (previous !== '') {
            alert('Complete the current operation first before applying a special operation.');
            return;
        }
    
        if (current === '') {
            alert('Enter a number before applying a special operation.');
            return;
        }

        try {
            const num1 = parseFloat(current);
            const result = await calculate(operationType, num1);
            const formattedResult = Number.isInteger(result) 
                ? result : result.toFixed(3);
            
            setCurrent(formattedResult);
            setPrevious('');
            setOperation(undefined);
            
            updateHistory(operationType, num1, null, formattedResult);
        } 
        
        catch (error) {
            console.error('Calculation error: ', error);
        }
    }, 500);

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
        '/': () => chooseOperation('/'),
        '%': () => chooseOperation('%'),
        '^': () => chooseOperation('^'),
        '=': () => computeRegularOperation(),
        'Enter': () => computeRegularOperation(),
        'Backspace': () => deleteNumber(),
        'Delete': () => deleteNumber(),
        'c': () => clear(),
        'C': () => clear()
    }), [addNumber, chooseOperation, computeRegularOperation, deleteNumber]);

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

    // render the calculator's interface
    return (
        <div className='grid-calc'>
            <div className='calculator-container'>
                <div data-testid='screen' className='screen'>
                    <div className='previous'>{previous} {operation}</div>
                    <div className='current'>{current}</div>
                </div>
                <button onClick={() => computeSpecialOperation('root')}>√</button>
                <button className='larger' onClick={clear}>C</button>
                <button onClick={deleteNumber}>DEL</button>
                <button onClick={() => chooseOperation('÷')}>÷</button>
                <button onClick={() => chooseOperation('^')}>^</button>
                <button onClick={() => addNumber('7')}>7</button>
                <button onClick={() => addNumber('8')}>8</button>
                <button onClick={() => addNumber('9')}>9</button>
                <button onClick={() => chooseOperation('*')}>*</button>
                <button onClick={() => computeSpecialOperation('sin')}>sin</button>
                <button onClick={() => addNumber('4')}>4</button>
                <button onClick={() => addNumber('5')}>5</button>
                <button onClick={() => addNumber('6')}>6</button>
                <button onClick={() => chooseOperation('-')}>-</button>
                <button onClick={() => computeSpecialOperation('cos')}>cos</button>
                <button onClick={() => addNumber('1')}>1</button>
                <button onClick={() => addNumber('2')}>2</button>
                <button onClick={() => addNumber('3')}>3</button>
                <button onClick={() => chooseOperation('+')}>+</button>
                <button onClick={() => computeSpecialOperation('tan')}>tan</button>
                <button onClick={() => addNumber('0')}>0</button>
                <button onClick={() => addNumber('.')}>.</button>
                <button className='larger' onClick={computeRegularOperation}>=</button>
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

export default Calculator;