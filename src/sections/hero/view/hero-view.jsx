/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const cursorBlinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const containerStyle = css`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const textStyle = (theme) => css`
  font-size: 2rem;
  opacity: 0;
  animation: ${fadeInAnimation} 0.5s forwards;
  position: relative;
  span:first-of-type {
    color: #000; /* Black color from palette */
  }
  span:last-of-type {
    color: ${theme.palette.primary.main}; /* Blue color from palette */
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 3px;
    height: 2rem;
    background-color: #000; /* Black color from palette */
    animation: ${cursorBlinkAnimation} 0.7s infinite;
  }
`;

const textHideStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

const buttonContainer = css`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

const phrases = [
  'helping you improve your life.',
  'finding what makes you happy.',
  'creating positive change.',
  'supporting your journey.',
  'empowering personal growth.',
];

const HeroView = () => {
  const theme = useTheme();
  const textRef = useRef(null);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleSignUpClick = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const textElement = textRef.current;

    let currentIndex = 0;
    let currentPhrase = phrases[currentIndex];
    let charIndex = 0;

    const type = () => {
      if (charIndex < currentPhrase.length) {
        textElement.innerHTML = `<span>We excel at </span><span>${currentPhrase.substring(
          0,
          charIndex + 1
        )}</span>`;
        charIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(erase, 2000);
      }
    };

    const erase = () => {
      if (charIndex >= 0) {
        textElement.innerHTML = `<span>We excel at </span><span>${currentPhrase.substring(
          0,
          charIndex
        )}</span>`;
        charIndex--;
        setTimeout(erase, 50);
      } else {
        currentIndex = (currentIndex + 1) % phrases.length;
        currentPhrase = phrases[currentIndex];
        charIndex = 0; // Reset charIndex to 0 for the next phrase
        setTimeout(type, 1000);
      }
    };

    type();
  }, []);

  return (
    <div css={containerStyle}>
      <div css={textHideStyle}></div>
      <div css={textStyle(theme)} ref={textRef}></div>
      <div css={buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleSignUpClick}>Sign Up</Button>
        <Button variant="outlined" color="primary" onClick={handleLoginClick}>Login</Button>
      </div>
    </div>
  );
};

export default HeroView;
