import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { MainContext } from '@contexts/MainContext';
import { fetchData } from '@utils/integrations/oura';
import { SleepData } from '@store/integrationTypes';

export default function SleepView() {
  const { ouraAccessToken } = useContext(MainContext) || {};


  return (
    <Container>
    </Container>
  );
}
