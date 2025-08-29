const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      EC: 1,
      EM: 'Không có token, truy cập bị từ chối'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      EC: 1,
      EM: 'Token không hợp lệ'
    });
  }
};

module.exports = auth;