"use client";

import { useState } from 'react';
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
    width: 300px;
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
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

const Button = styled.button`
    width: 70px;
    height: 70px;
    font-size: 1.5em;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${({ color }) => color || '#ffffff'};
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
    }

    &:active {
        background-color: #d0d0d0;
    }
`;

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [value, setValue] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplayValue(String(digit));
            setWaitingForOperand(false);
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

        if (value == null) {
            setValue(inputValue);
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = {
                '+': currentValue + inputValue,
                '-': currentValue - inputValue,
                '*': currentValue * inputValue,
                '/': currentValue / inputValue,
                '=': inputValue,
            }[operator];

            setValue(newValue);
            setDisplayValue(String(newValue));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <CalculatorWrapper>
            <Display>{displayValue}</Display>
            <ButtonGrid>
                <Button color="#f0f0f0" onClick={clearDisplay}>AC</Button>
                <Button color="#f0f0f0" onClick={toggleSign}>±</Button>
                <Button color="#f0f0f0" onClick={inputPercent}>%</Button>
                <Button color="#f9a825" onClick={() => performOperation('/')}>÷</Button>
                <Button onClick={() => inputDigit(7)}>7</Button>
                <Button onClick={() => inputDigit(8)}>8</Button>
                <Button onClick={() => inputDigit(9)}>9</Button>
                <Button color="#f9a825" onClick={() => performOperation('*')}>×</Button>
                <Button onClick={() => inputDigit(4)}>4</Button>
                <Button onClick={() => inputDigit(5)}>5</Button>
                <Button onClick={() => inputDigit(6)}>6</Button>
                <Button color="#f9a825" onClick={() => performOperation('-')}>−</Button>
                <Button onClick={() => inputDigit(1)}>1</Button>
                <Button onClick={() => inputDigit(2)}>2</Button>
                <Button onClick={() => inputDigit(3)}>3</Button>
                <Button color="#f9a825" onClick={() => performOperation('+')}>+</Button>
                <Button onClick={() => inputDigit(0)}>0</Button>
                <Button onClick={openModal}>ⓘ</Button>
                <Button onClick={inputDot}>.</Button>
                <Button color="#f9a825" onClick={() => performOperation('=')}>=</Button>
            </ButtonGrid>
            <Modal show={showModal} onClose={closeModal} />
        </CalculatorWrapper>
    );
};

export default Calculator;
