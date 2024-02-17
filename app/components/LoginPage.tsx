import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Form, Input, Button, Typography, Space, message } from 'antd'; // Import message from antd

const { Title } = Typography;

const auth = getAuth();

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or navigate to another page upon successful login
    } catch (error) {
      console.error('Error signing in with email and password:', error);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      // Check if the password meets the minimum length requirement
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect or navigate to another page upon successful signup
    } catch (error) {
      console.error('Error signing up with email and password:', error);
      message.error(error.message); // Display error message using Ant Design message component
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Redirect or navigate to another page upon successful login
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={2}>Login</Title>
      <Form layout="vertical">
        <Form.Item label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleEmailLogin}>Login with Email</Button>
            <Button onClick={handleEmailSignUp}>Sign Up with Email</Button>
            <Button type="primary" onClick={handleGoogleLogin}>Login with Google</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
