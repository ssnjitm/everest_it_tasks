import app from './app.js';
import sequelize from './config/database.js';

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.sync(); // Creates tables if they don't exist
    app.listen(PORT, () => {
      console.log(`Server spinning at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start:', error);
  }
}

startServer();