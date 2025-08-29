const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = {
  registerUser: async (userData) => {
    try {
      const { username, email, password } = userData;

      // Kiểm tra user đã tồn tại
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return {
          EC: 1,
          EM: 'Email đã được sử dụng'
        };
      }

      const existingUsername = await User.findByUsername(username);
      if (existingUsername) {
        return {
          EC: 1,
          EM: 'Username đã được sử dụng'
        };
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Tạo user mới
      await User.create({
        username,
        email,
        password: hashedPassword
      });

      return {
        EC: 0,
        EM: 'Đăng ký thành công'
      };
    } catch (error) {
      return {
        EC: -1,
        EM: 'Lỗi server'
      };
    }
  },

  loginUser: async (userData) => {
    try {
      const { email, password } = userData;

      // Tìm user
      const user = await User.findByEmail(email);
      if (!user) {
        return {
          EC: 1,
          EM: 'Email không tồn tại'
        };
      }

      // Kiểm tra password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return {
          EC: 1,
          EM: 'Mật khẩu không đúng'
        };
      }

      // Tạo JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        EC: 0,
        EM: 'Đăng nhập thành công',
        DT: {
          access_token: token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        }
      };
    } catch (error) {
      return {
        EC: -1,
        EM: 'Lỗi server'
      };
    }
  },

  forgotPassword: async (email, newPassword) => {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return {
          EC: 1,
          EM: 'Email không tồn tại'
        };
      }

      // Hash password mới
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await User.updatePassword(email, hashedPassword);

      return {
        EC: 0,
        EM: 'Đổi mật khẩu thành công'
      };
    } catch (error) {
      return {
        EC: -1,
        EM: 'Lỗi server'
      };
    }
  }
};

module.exports = userService;