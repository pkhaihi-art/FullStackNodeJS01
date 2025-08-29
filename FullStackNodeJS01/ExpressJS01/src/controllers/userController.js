const userService = require('../services/userService');

const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        EC: 1,
        EM: 'Vui lòng nhập đầy đủ thông tin'
      });
    }

    const data = await userService.registerUser({ username, email, password });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: 'Lỗi server'
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        EC: 1,
        EM: 'Vui lòng nhập email và password'
      });
    }

    const data = await userService.loginUser({ email, password });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: 'Lỗi server'
    });
  }
};

const handleForgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        EC: 1,
        EM: 'Vui lòng nhập email và mật khẩu mới'
      });
    }

    const data = await userService.forgotPassword(email, newPassword);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: 'Lỗi server'
    });
  }
};

module.exports = { handleRegister, handleLogin, handleForgotPassword };