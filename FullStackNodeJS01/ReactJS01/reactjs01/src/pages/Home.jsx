import React, { useState, useEffect } from 'react';
import { Button, message, Card } from 'antd';
import { authAPI } from '../utils/api';
import { useAuth } from '../components/context/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const response = await authAPI.getHome();
            if (response.data.EC === 0) {
                setHomeData(response.data.DT);
            }
        } catch (error) {
            message.error('Không thể tải dữ liệu');
        }
        setLoading(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        message.success('Đăng xuất thành công!');
    };

    return (
        <div style={{ maxWidth: 800, margin: '50px auto', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h1>Trang chủ</h1>
                <Button onClick={handleLogout}>Đăng xuất</Button>
            </div>

            <Card title="Thông tin người dùng" loading={loading}>
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                {homeData && (
                    <p><strong>Message:</strong> {homeData.message}</p>
                )}
            </Card>
        </div>
    );
};

export default Home;