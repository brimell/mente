import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';
import * as oura from 'oura';
import { MainContext } from '@contexts/MainContext';

export default function SleepView() {
  const [sleepData, setSleepData] = useState([]);
  const { ouraAccessToken } = useContext(MainContext);

  useEffect(() => {
    // Replace 'fetchOuraData' with actual Oura client calls based on how you've set it up
    const fetchOuraData = async () => {
      try {
        // Example fetching logic; replace with actual API calls using the 'oura' npm module or direct fetch
        const ouraClient = new oura.Client(ouraAccessToken);

        // start from 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        // Format the date as YYYY-MM-DD
        const start = sevenDaysAgo.toISOString().split('T')[0];

        // end at today
        const today = new Date();
        // Format the date as YYYY-MM-DD
        const end = today.toISOString().split('T')[0];

        const sleepResponse = await ouraClient.dailySleep(start, end);
        setSleepData(sleepResponse);
      } catch (error) {
        console.error('Error fetching Oura sleep data:', error);
      }
    };

    fetchOuraData();
  }, []); // Empty dependency array means this effect runs once on component mount

  console.log(sleepData)
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Sleep Data
      </Typography>
      <Grid container spacing={2}>
        {sleepData.map((sleepEntry, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">Date: {sleepEntry.date}</Typography>
                <Typography>Duration: {sleepEntry.duration}</Typography>
                {/* Add more sleep data details here */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
