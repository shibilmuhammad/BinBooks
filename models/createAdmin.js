const connectDB = require('../db'); // Adjust the path accordingly
const bcrypt = require('bcrypt');
const Admin = require('./admin.js');
const mongoose = require('mongoose');

const createDefaultAdmin = async () => {
  let connection;
  try {
    // Connect to the MongoDB database
    connection = await connectDB();

    const existingAdmin = await Admin.findOne({ username: 'admin@gmail.com' });

    if (!existingAdmin) {
      // If admin does not exist, create a new admin account with the default password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin@123', salt);

      const defaultAdmin = new Admin({
        username: 'admin@gmail.com',
        password: hashedPassword,
      });

      await defaultAdmin.save();
      console.log('Default admin account created successfully.');
    } else {
      // If admin already exists, update the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin@123', salt);

      existingAdmin.password = hashedPassword;
      await existingAdmin.save();

      console.log('Default admin account password updated successfully.');
    }
  } catch (error) {
    console.error('Error creating/updating default admin account:', error);
  } finally {
    // Close the MongoDB connection after the operation (if it was opened)
    if (connection) {
      connection.close();
    }
  }
};

createDefaultAdmin();
