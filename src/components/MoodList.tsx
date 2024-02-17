// components/MoodList.tsx
import React from 'react';
import { List } from 'antd';

interface MoodListProps {
  moods: { date: string; mood: string }[];
}

const MoodList: React.FC<MoodListProps> = () => {

  

  return (
    <List
      dataSource={moods}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.date} description={item.mood} />
        </List.Item>
      )}
    />
  );
};

export default MoodList;
