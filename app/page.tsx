// ./app/page.tsx
import React from 'react';
import { Typography } from 'antd';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import FirebaseProvider from './contexts/FirebaseContext';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';


const { Title } = Typography;

const HomePage: React.FC = () => {

  return (
    <FirebaseProvider>
      <React.Fragment>
        <div style={{ padding: 20 }}>
          <Title level={2}>Mood Tracker</Title>
          <MoodForm />
          <MoodList />
        </div>
      </React.Fragment>
    </FirebaseProvider>
  );
};

export default HomePage;
