const { db } = require('./server/db/database.js');
// import db from './server/db/database.js'
const app = require('./server/index.js');
// import app from './server/index'

const PORT = 3001;

const init = async () => {
  try {
    await db.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`
        Listening on port ${PORT}
        http://localhost:${PORT}/
    `);
    });
  } catch (error) {
    console.log(`There was an error starting up!`, error);
  }
};

init();
