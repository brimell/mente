"use client"
import React, { useContext } from 'react';
import { Typography } from 'antd';
import MainContextProvider, { MainContext } from './contexts/MainContext';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import LoginPage from './components/LoginPage'; // Import LoginPage component

const { Title } = Typography;

const HomePage: React.FC = () => {
  const { currentUser } = useContext(MainContext);

  return (
    <MainContextProvider>
      <div style={{ padding: 20 }}>
        <Title level={2}>Mood Tracker</Title>
        {currentUser ? ( // Render MoodForm and MoodList if user is authenticated
          <>
            <MoodForm />
            <MoodList />
          </>
        ) : (
          <LoginPage /> // Render LoginPage if user is not authenticated
        )}
      </div>
    </MainContextProvider>
  );
};

export default HomePage;
