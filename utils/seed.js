const connection = require('../config/connection');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to MongoDB');

    console.info('Dropping collections')
    let userThoughtsCheck = await connection.db.listCollections({ name: 'users.thoughts' }).toArray();
    if (userThoughtsCheck.length) {
        await connection.dropCollection('users.thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    await connection.createCollection('users');
    await connection.createCollection('users.thoughts');

    console.info('Created collections:')
    const collections = await connection.db.listCollections().toArray();
    collections.sort().forEach(collection => {
        console.log(`   - ${collection.name}`);
    });

    console.info('Seeding complete! 🌱\n');
    process.exit(0);

});
