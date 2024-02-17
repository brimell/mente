import { useState, useContext } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from '../utils/auth'; // Import loginUser utility function
import { MainContext } from '../contexts/MainContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(MainContext);
	const navigateTo = useNavigate();

  const onFinish = async (values: { username: any; password: any; }) => {
    setLoading(true);
    const { username, password } = values;
    try {
      await loginUser(username, password); // Login user
      console.log('Logged in successfully!');
      setLoading(false);
      // Redirect to main page if user is logged in
      if (currentUser) {
        navigateTo('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      // Handle login failure
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto', marginTop: 50 }}>
      <h1>Login</h1>
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a href="/forgot-password" style={{ float: 'right' }}>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
