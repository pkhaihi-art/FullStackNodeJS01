const { pool } = require('../config/database');

class User {
  static async create(userData) {
    const { username, email, password } = userData;
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async updatePassword(email, newPassword) {
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE email = ?',
      [newPassword, email]
    );
    return result;
  }
}

module.exports = User;