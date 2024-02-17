// ./app/page.tsx
import React, { useContext } from 'react';
import { Typography } from 'antd';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import MainContextProvider, { MainContext } from './contexts/MainContext';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import LoginPage from './components/LoginPage';

const { Title } = Typography;

const HomePage: React.FC = () => {
  const { currentUser } = useContext(MainContext);

  return (
    <MainContextProvider>
      <React.Fragment>
        <div style={{ padding: 20 }}>
          <Title level={2}>Mood Tracker</Title>
          {currentUser ? (
            <>
              <MoodForm />
              <MoodList />
            </>
          ) : (
            <LoginPage />
          )}
        </div>
      </React.Fragment>
    </MainContextProvider>
  );
};

export default HomePage;
