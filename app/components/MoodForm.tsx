// components/MoodForm.tsx
import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

interface MoodFormProps {
  onSubmit: (values: any) => void;
}

const MoodForm: React.FC<MoodFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="inline">
      <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select date!' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="mood" label="Mood" rules={[{ required: true, message: 'Please input your mood!' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Mood
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MoodForm;
