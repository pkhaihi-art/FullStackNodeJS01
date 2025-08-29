import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { authAPI } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await authAPI.register(values);
            if (response.data.EC === 0) {
                message.success('Đăng ký thành công!');
                navigate('/login');
            } else {
                message.error(response.data.EM);
            }
        } catch (error) {
            message.error('Đăng ký thất bại!');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
            <h2>Đăng ký</h2>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Đăng ký
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
                </div>
            </Form>
        </div>
    );
};

export default Register;