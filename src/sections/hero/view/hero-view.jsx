import React, { useEffect, useRef } from 'react';
import { Container } from '@mui/material';
import '../hero.css';

const phrases = [
  'helping you improve your life.',
  'finding what makes you happy.',
  'creating positive change.',
  'supporting your journey.',
  'empowering personal growth.',
];

const HeroView = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const textCursorElement = cursorRef.current;

    let currentIndex = 0;
    let currentPhrase = phrases[currentIndex];
    let charIndex = 0;

    const type = () => {
      if (charIndex < currentPhrase.length) {
        textElement.textContent = "We excel at " + currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        adjustCursorPosition();
        setTimeout(type, 100);
      } else {
        currentIndex = (currentIndex + 1) % phrases.length;
        currentPhrase = phrases[currentIndex];
        setTimeout(erase, 2000);
      }
    };

    const erase = () => {
      if (charIndex >= 0) {
        textElement.textContent = "We excel at " + currentPhrase.substring(0, charIndex);
        charIndex--;
        adjustCursorPosition();
        setTimeout(erase, 50);
      } else {
        setTimeout(type, 1000);
      }
    };

    const adjustCursorPosition = () => {
      const screenWidth = window.innerWidth;
      const textWidth = textElement.getBoundingClientRect().width;
      textCursorElement.style.left = `${screenWidth / 2 + textWidth / 2}px`;
    };

    type();
  }, []);

  return (
    <Container style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text_hide"></div>
      <div className="text" ref={textRef}></div>
      <div className="text_cursor" ref={cursorRef}></div>
    </Container>
  );
};

export default HeroView;
