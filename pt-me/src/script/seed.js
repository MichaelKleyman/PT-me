const { db, User } = require('../../server/db/index.js');

async function seed() {
  await db.sync({ force: true });
  console.log('db is synced!');

  const user = await Promise.all([
    User.create({
      clinicname: 'test',
      email: 'test@test.com',
      location: 'test',
      password: '123456',
    }),
  ]);

  console.log('seeded successfully');
}

seed();
