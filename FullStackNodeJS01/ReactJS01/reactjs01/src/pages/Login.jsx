import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { authAPI } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/auth';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await authAPI.login(values);
            if (response.data.EC === 0) {
                message.success('Đăng nhập thành công!');
                login(response.data.DT.user, response.data.DT.access_token);
                navigate('/home');
            } else {
                message.error(response.data.EM);
            }
        } catch (error) {
            message.error('Đăng nhập thất bại!');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
            <h2>Đăng nhập</h2>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Đăng nhập
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/register">Chưa có tài khoản? Đăng ký</Link><br/>
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>
            </Form>
        </div>
    );
};

export default Login;