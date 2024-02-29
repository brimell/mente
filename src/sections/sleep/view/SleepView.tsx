import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { MainContext } from '@contexts/MainContext';
import { getPersonalInfo, getSleepData } from '@utils/integrations/oura';

export default function SleepView() {
  const [sleepData, setSleepData] = useState<[]>([]);
  const { ouraAccessToken } = useContext(MainContext) || {};

  const fetchOuraData = async (ouraAccessToken: string) => {
    try {
      console.log(`Fetching Oura sleep data with access token: ${ouraAccessToken}`);

      // start from 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      // Format the date as YYYY-MM-DD
      const start = sevenDaysAgo.toISOString().split('T')[0];

      // end at today
      const today = new Date();
      // Format the date as YYYY-MM-DD
      const end = today.toISOString().split('T')[0];

      const sleepResponse = await getSleepData(ouraAccessToken, start, end);
      if (sleepResponse && !(sleepResponse === undefined)) setSleepData(sleepResponse as any);
    } catch (error) {
      console.error('Error fetching Oura sleep data:', error);
    }
  };

  useEffect(() => {
    if (ouraAccessToken) {
      getPersonalInfo(ouraAccessToken).then((data) => {
        console.log(data);
      });
      fetchOuraData(ouraAccessToken);
    }
  }, [ouraAccessToken]); // Empty dependency array means this effect runs once on component mount

  console.log(sleepData);
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Sleep Data
      </Typography>
      <Grid container spacing={2}>
        {sleepData &&
          // @ts-ignore
          sleepData.map((sleepEntry, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  {/* <Typography variant="h6">Date: {sleepEntry.date}</Typography>
                  <Typography>Duration: {sleepEntry.duration}</Typography> */}
                  {/* Add more sleep data details here */}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
