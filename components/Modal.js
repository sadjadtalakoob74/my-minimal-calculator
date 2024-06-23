"use client";

import styled from 'styled-components';

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 90%;
    text-align: center;
`;

const CloseButton = styled.button`
    background: #f9a825;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
    font-size: 1em;
    cursor: pointer;
    margin-top: 20px;
    display: block;
    width: 100%;
    text-align: center;

    &:hover {
        background: #f9b825;
    }

    &:active {
        background: #f9c825;
    }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8em;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  color: #666;
  font-size: 1.1em;
  line-height: 1.5;
`;

const Link = styled.a`
  color: #f9a825;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Modal = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <ModalWrapper>
            <ModalContent>
                <Title>👋 Hi, I'm Sajjad Talakoob!</Title>
                <Paragraph>
                    I'm a passionate and dedicated developer. Check out my portfolio for more information:
                </Paragraph>
                <Paragraph>
                    <Link href="http://sajjad-talakoob-resume.freehost.io/" target="_blank" rel="noopener noreferrer">
                        🌐 sajjad-talakoob-resume.freehost.io
                    </Link>
                </Paragraph>
                <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;
