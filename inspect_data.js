const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'eali_db',
    password: 'alfatiha',
    port: 5432,
});

async function inspectData() {
    try {
        await client.connect();
        const tables = ['api_newsevent', 'api_partner', 'tenders', 'programs'];
        const results = {};

        for (const table of tables) {
            const res = await client.query(`SELECT * FROM ${table}`);
            results[table] = res.rows;
        }

        fs.writeFileSync('inspection_results.json', JSON.stringify(results, null, 2));
        console.log('Results written to inspection_results.json');
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

inspectData();
