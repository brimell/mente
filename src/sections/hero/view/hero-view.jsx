import React, { useRef, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import gsap from 'gsap';

const phrases = [
  'helping you improve your life',
  'finding what makes you happy',
  'creating positive change',
  'supporting your journey',
  'empowering personal growth',
];

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current.children;
    gsap.from(text, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.1, // Stagger the animation by 0.1 seconds
    });
  }, []);

  const getRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };

  return (
    <Container style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" align="center" ref={textRef}>
        {getRandomPhrase()}
      </Typography>
    </Container>
  );
};

export default Hero;
