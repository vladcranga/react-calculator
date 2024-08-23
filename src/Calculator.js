import React, { useState } from "react";

function Calculator() {
    // state hooks
    const [current, setCurrent] = useState('');
    const [previous, setPrevious] = useState('');
    const [operation, setOperation] = useState(undefined);

    // calculator logic
    const clear = () => {
        setCurrent('');
        setPrevious('');
        setOperation(undefined);
      };
    
      const deleteNumber = () => {
        setCurrent(current.toString().slice(0, -1));
      };
    
      const addNumber = (number) => {
        if (number === '.' && current.includes('.')) return;
        setCurrent(current.toString() + number.toString());
      };
    
      const chooseOperation = (op) => {
        if (current === '') return;
        if (previous !== '') {
          computeValue();
        }
        setOperation(op);
        setPrevious(current);
        setCurrent('');
      };
    
      const computeValue = () => {
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
          default:
            return;
        }
        setCurrent(result.toString());
        setOperation(undefined);
        setPrevious('');
      };

    // html to jsx
    return ( 
      <div className="grid-calc">
        <div className="screen">
          <div className="previous">{previous} {operation}</div>
          <div className="current">{current}</div>
        </div>
        <button className="larger" onClick={clear}>C</button>
        <button onClick={deleteNumber}>DEL</button>
        <button onClick={() => chooseOperation('÷')}>÷</button>
        <button onClick={() => addNumber('7')}>7</button>
        <button onClick={() => addNumber('8')}>8</button>
        <button onClick={() => addNumber('9')}>9</button>
        <button onClick={() => chooseOperation('*')}>*</button>
        <button onClick={() => addNumber('4')}>4</button>
        <button onClick={() => addNumber('5')}>5</button>
        <button onClick={() => addNumber('6')}>6</button>
        <button onClick={() => chooseOperation('-')}>-</button>
        <button onClick={() => addNumber('1')}>1</button>
        <button onClick={() => addNumber('2')}>2</button>
        <button onClick={() => addNumber('3')}>3</button>
        <button onClick={() => chooseOperation('+')}>+</button>
        <button onClick={() => addNumber('0')}>0</button>
        <button onClick={() => addNumber('.')}>.</button>
        <button className="larger" onClick={computeValue}>=</button>
    </div>
    );
}

export default Calculator