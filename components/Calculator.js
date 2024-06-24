"use client";

import {useState} from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const CalculatorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

const Display = styled.div`
    width: ${({isAdvancedMode}) => (isAdvancedMode ? '370px' : '300px')};
    height: 60px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 2em;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const OperationSymbol = styled.span`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5em;
    color: #888;
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: ${({isAdvanced}) => (isAdvanced ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)')};
    gap: 10px;
`;

const Button = styled.button`
    width: 70px;
    height: 70px;
    font-size: 1.5em;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${({color}) => color || '#ffffff'};
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
    }

    &:active {
        background-color: #d0d0d0;
    }
`;

const ToggleButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 150px;
    height: 50px;
    font-size: 1em;
    border: none;
    border-radius: 10px;
    background-color: #f9a825;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #e0a400;
    }

    &:active {
        background-color: #d09600;
    }
`;

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [value, setValue] = useState(null);
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [operatorSymbol, setOperatorSymbol] = useState(null);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplayValue(String(digit));
            setWaitingForOperand(false);
            setOperatorSymbol(null);
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
        }
    };

    const inputDot = () => {
        if (waitingForOperand) {
            setDisplayValue('.');
            setWaitingForOperand(false);
        } else if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    };

    const clearDisplay = () => {
        setDisplayValue('0');
        setOperator(null);
        setValue(null);
        setWaitingForOperand(false);
        setOperatorSymbol(null);
    };

    const toggleSign = () => {
        setDisplayValue(displayValue.charAt(0) === '-' ? displayValue.slice(1) : '-' + displayValue);
    };

    const inputPercent = () => {
        const currentValue = parseFloat(displayValue);
        if (currentValue === 0) return;
        setDisplayValue(String(currentValue / 100));
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(displayValue);

        if (nextOperator === '!') {
            const result = factorial(inputValue);
            setValue(result);
            setDisplayValue(String(result));
            setWaitingForOperand(false);
            setOperator(null);
            return;
        }

        if (value == null) {
            setValue(inputValue);
        } else if (operator) {
            const currentValue = value || 0;
            let newValue;

            switch (operator) {
                case '+':
                    newValue = currentValue + inputValue;
                    break;
                case '-':
                    newValue = currentValue - inputValue;
                    break;
                case '*':
                    newValue = currentValue * inputValue;
                    break;
                case '/':
                    newValue = currentValue / inputValue;
                    break;
                case '^':
                    newValue = Math.pow(currentValue, inputValue);
                    break;
                default:
                    newValue = inputValue;
            }

            setValue(newValue);
            setDisplayValue(String(newValue));
        }

        if (['sqrt', 'ln', 'log'].includes(nextOperator)) {
            let newValue;
            switch (nextOperator) {
                case 'sqrt':
                    newValue = Math.sqrt(inputValue);
                    break;
                case 'ln':
                    newValue = Math.log(inputValue);
                    break;
                case 'log':
                    newValue = Math.log10(inputValue);
                    break;
                default:
                    newValue = inputValue;
            }

            setValue(newValue);
            setDisplayValue(String(newValue));
            setWaitingForOperand(false);
            setOperator(null);
        } else {
            setWaitingForOperand(true);
            setOperator(nextOperator);
            setOperatorSymbol(nextOperator);
        }
    };

    const toggleAdvancedMode = () => {
        setIsAdvancedMode(!isAdvancedMode);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const factorial = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };


    return (
        <CalculatorWrapper>
            <ToggleButton onClick={toggleAdvancedMode}>
                {isAdvancedMode ? 'Basic Mode' : 'Advanced Mode'}
            </ToggleButton>
            <Display isAdvancedMode={isAdvancedMode}>
                {operatorSymbol && <OperationSymbol>{operatorSymbol}</OperationSymbol>}
                {displayValue}
            </Display>
            <ButtonGrid isAdvanced={isAdvancedMode}>
                <Button color="#f0f0f0" onClick={clearDisplay}>AC</Button>
                <Button color="#f0f0f0" onClick={toggleSign}>±</Button>
                <Button color="#f0f0f0" onClick={inputPercent}>%</Button>
                {isAdvancedMode && <Button color="#f0f0f0" onClick={() => performOperation('^')}>^</Button>}
                <Button color="#f9a825" onClick={() => performOperation('/')}>÷</Button>
                <Button onClick={() => inputDigit(7)}>7</Button>
                <Button onClick={() => inputDigit(8)}>8</Button>
                <Button onClick={() => inputDigit(9)}>9</Button>
                {isAdvancedMode && <Button color="#f0f0f0" onClick={() => performOperation('sqrt')}>√</Button>}
                <Button color="#f9a825" onClick={() => performOperation('*')}>×</Button>
                <Button onClick={() => inputDigit(4)}>4</Button>
                <Button onClick={() => inputDigit(5)}>5</Button>
                <Button onClick={() => inputDigit(6)}>6</Button>
                {isAdvancedMode && <Button color="#f0f0f0" onClick={() => performOperation('ln')}>ln</Button>}
                <Button color="#f9a825" onClick={() => performOperation('-')}>−</Button>
                <Button onClick={() => inputDigit(1)}>1</Button>
                <Button onClick={() => inputDigit(2)}>2</Button>
                <Button onClick={() => inputDigit(3)}>3</Button>
                {isAdvancedMode && <Button color="#f0f0f0" onClick={() => performOperation('log')}>log</Button>}
                <Button color="#f9a825" onClick={() => performOperation('+')}>+</Button>
                <Button onClick={() => inputDigit(0)}>0</Button>
                <Button onClick={openModal}>ⓘ</Button>
                <Button onClick={inputDot}>.</Button>
                {isAdvancedMode && <Button color="#f0f0f0" onClick={() => performOperation('!')}>!</Button>}
                <Button color="#f9a825" onClick={() => performOperation('=')}>=</Button>
            </ButtonGrid>
            <Modal show={showModal} onClose={closeModal}/>
        </CalculatorWrapper>
    );
};

export default Calculator;
