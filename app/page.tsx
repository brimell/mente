// ./app/page.tsx
import React from 'react';
import { Typography } from 'antd';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import MainContextProvider from './contexts/MainContext';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';


const { Title } = Typography;

const HomePage: React.FC = () => {

  return (
    <MainContextProvider>
      <React.Fragment>
        <div style={{ padding: 20 }}>
          <Title level={2}>Mood Tracker</Title>
          <MoodForm />
          <MoodList />
        </div>
      </React.Fragment>
    </MainContextProvider>
  );
};

export default HomePage;
