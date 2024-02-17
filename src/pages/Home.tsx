import { useState } from 'react';
import { Layout, Button, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;

const HomePage = () => {
  const [moodData, setMoodData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    // Handle form submission, add mood data to state, and close modal
    setMoodData([...moodData, values]);
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ padding: '24px 24px 0' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <h1>Dashboard</h1>
        {/* Render mood data */}
        <div>
          {moodData.map((mood, index) => (
            <div key={index}>
              <p>{mood.date}: {mood.mood}</p>
            </div>
          ))}
        </div>
        {/* Button to add new mood */}
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          Add Mood
        </Button>
        {/* Modal for adding mood */}
        <Modal title="Add Mood" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <Form
            name="add-mood-form"
            onFinish={onFinish}
          >
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: 'Please select date!' }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Mood"
              name="mood"
              rules={[{ required: true, message: 'Please select mood!' }]}
            >
              <Select>
                <Option value="Happy">Happy</Option>
                <Option value="Sad">Sad</Option>
                <Option value="Angry">Angry</Option>
                <Option value="Excited">Excited</Option>
                <Option value="Calm">Calm</Option>
                {/* Add more mood options as needed */}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default HomePage;
