export {};

const { db } = require('./src/server/db/database');
const app = require('./src/server/index');

// const PORT = 3000;

// const init = async () => {
//   try {
//     await db.sync({ force: true });
//     app.listen(PORT, () => {
//       console.log(`
//         Listening on port ${PORT}
//         http://localhost:${PORT}/
//     `);
//     });
//   } catch (error) {
//     console.log(`There was an error starting up!`, error);
//   }
// };

// init();
