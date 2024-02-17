// pages/index.tsx
import React, { useState } from 'react';
import { Typography } from 'antd';
import MoodForm from '../components/MoodForm';
import MoodList from '../components/MoodList';
import FirebaseProvider from '../contexts/FirebaseContext';
import { useFirebase } from '../contexts/FirebaseContext';

const { Title } = Typography;

const Home: React.FC = () => {
  const firebase = useFirebase();
  const [moods, setMoods] = useState<{ date: string; mood: string }[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      await firebase.collection('moods').add(values);
      setMoods([...moods, values]);
    } catch (error) {
      console.error('Error adding mood: ', error);
    }
  };

  return (
    <FirebaseProvider>
      <div style={{ padding: 20 }}>
        <Title level={2}>Mood Tracker</Title>
        <MoodForm onSubmit={handleSubmit} />
        <MoodList moods={moods} />
      </div>
    </FirebaseProvider>
  );
};

export default Home;
