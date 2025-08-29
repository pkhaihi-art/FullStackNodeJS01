import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { authAPI } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await authAPI.forgotPassword(values);
            if (response.data.EC === 0) {
                message.success('Đổi mật khẩu thành công!');
                navigate('/login');
            } else {
                message.error(response.data.EM);
            }
        } catch (error) {
            message.error('Đổi mật khẩu thất bại!');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
            <h2>Quên mật khẩu</h2>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ required: true, min: 6 }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Đổi mật khẩu
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/login">Quay lại đăng nhập</Link>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPassword;