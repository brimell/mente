import { useState, useEffect, useContext } from 'react';
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from '@components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import TimeChart from '../time-chart';
import StatsGraph from '../stats-graph';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

import { MainContext } from '../../../contexts/MainContext';
import MorningPreparationButton from '../MorningPreparationButton';
import EveningReflectionButton from '../EveningReflectionButton';

export default function DashboardView() {
  const { currentUser, sleepData, moods } = useContext(MainContext);

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 5 }}>
        hi {currentUser.displayName.toLowerCase()}, welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="this week's mood"
            value={
              moods
                ? (
                    moods.reduce((acc, curr) => acc + parseInt(curr.mood), 0) / moods.length
                  ).toFixed(1)
                : 'loading...'
            }
            icon={<Typography variant="h2">🤔</Typography>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="this week's sleep"
            value={
              sleepData
                ? (
                    sleepData.reduce((acc, curr) => acc + curr.total_sleep_duration / 60 ** 2, 0) /
                    sleepData.length
                  ).toFixed(1) + 'h'
                : 'loading...'
            }
            icon={<Typography variant="h2">💤</Typography>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="this week's time wasted"
            value={'12h 34m'}
            icon={<Typography variant="h2">⏳</Typography>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="this week's physical activity"
            value={'3h 30m'}
            icon={<Typography variant="h2">🏋️</Typography>}
          />
        </Grid>
        <Grid xs={12} md={12} lg={6}>
          <MorningPreparationButton />
        </Grid>
        <Grid xs={12} md={12} lg={6}>
          <EveningReflectionButton />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          {sleepData && moods && (
            <StatsGraph
              title="compare your stats!"
              subheader="sleep, mood, physical activity"
              chart={{
                labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                colors: ['#2d338d', '#ffab00', '#00a8ff'],
                series: [
                  {
                    name: 'Sleep',
                    type: 'column',
                    fill: 'solid',
                    data: sleepData.map((data) => (data.total_sleep_duration / 60 ** 2).toFixed(1)),
                  },
                  {
                    name: 'Mood',
                    type: 'area',
                    fill: 'gradient',
                    data: moods.map((mood) => parseInt(mood.mood)),
                  },
                  {
                    name: 'Physical Activity',
                    type: 'line',
                    fill: 'solid',
                    data: [3, 2, 0.5, 1, 2, 1.5, 2],
                  },
                ],
              }}
            />
          )}
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <TimeChart
            title="time chart"
            chart={{
              series: [
                { label: 'Productive', value: 4344 },
                { label: 'Entertainment', value: 5435 },
                { label: 'Uncategorised', value: 1443 },
                { label: 'Physical Activity', value: 4443 },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
