const db = require('../config/db');

const ProductModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM products', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { name, description, price, category, image } = data;
    db.query(
      'INSERT INTO products (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category, image],
      callback
    );
  },

  update: (id, data, callback) => {
    const { name, description, price, category, image } = data;
    db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ? WHERE id = ?',
      [name, description, price, category, image, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
  },
};

module.exports = ProductModel;
