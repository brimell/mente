import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import gsap from 'gsap';

const phrases = [
  'helping you improve your life.',
  'finding what makes you happy.',
  'creating positive change.',
  'supporting your journey.',
  'empowering personal growth.',
];

const Hero = () => {
  useEffect(() => {
    const textElement = document.querySelector('.text');
    const textHide = document.querySelector('.text_hide');
    const textCursor = document.querySelector('.text_cursor');

    const typingAnimation = () => {
      let textArray = phrases[Math.floor(Math.random() * phrases.length)].split('');
      let textLength = textArray.length;

      const cursorAnimation = gsap.to(textCursor, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.7,
      });

      gsap.timeline({ onComplete: typingAnimation })
        .to(textCursor, { opacity: 1, repeat: 1, repeatDelay: 1, duration: 0.7 })
        .to(textElement, {
          opacity: 1,
          duration: 0.5,
          onStart: () => (textElement.textContent = ''),
          onComplete: () => cursorAnimation.restart(),
        });

      textArray.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.position = 'relative';
        span.style.top = '-100%';
        textElement.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          top: 0,
          duration: 0.3,
          delay: index * 0.1,
          ease: 'power1.in',
        });

        gsap.to(textHide, {
          left: `${((index + 1) / textLength) * 100}%`,
          duration: 3,
          ease: 'power1.inOut',
        });
      });
    };

    typingAnimation();
  }, []);

  return (
    <Container style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text_hide"></div>
      <div className="text" style={{ fontSize: '2rem'}}></div>
      <div className="text_cursor" style={{ borderLeft: '3px solid black' }}></div>
    </Container>
  );
};

export default Hero;
