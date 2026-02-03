const app = require('./app');
const MongoDB = require('./app/utils/mongodb.util');
const config = require('./app/config');
async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log('Connect to the databse successfully!');

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Cannot start the server!', error);
    process.exit();
  }
}

startServer();
