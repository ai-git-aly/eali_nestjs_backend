const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'eali_db',
    password: 'alfatiha',
    port: 5432,
});

client.connect()
    .then(() => {
        console.log('Connected to database');
        return client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    })
    .then(res => {
        console.log('Tables in eali_db:');
        res.rows.forEach(row => console.log(`- ${row.table_name}`));
        return client.end();
    })
    .catch(err => {
        console.error('Database error:', err);
        client.end();
    });
