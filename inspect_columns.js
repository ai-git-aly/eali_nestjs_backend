const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'eali_db',
    password: 'alfatiha',
    port: 5432,
});

async function inspect() {
    try {
        await client.connect();
        const tables = ['api_newsevent', 'api_partner', 'users'];
        let output = '';
        for (const table of tables) {
            const res = await client.query(`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = '${table}'`);
            if (res.rows.length > 0) {
                output += `Columns in ${table}:\n`;
                res.rows.forEach(r => output += `- ${r.column_name} (${r.data_type}, nullable: ${r.is_nullable})\n`);
            } else {
                output += `Table ${table} not found or empty.\n`;
            }
        }
        fs.writeFileSync('db_schema.txt', output);
        console.log('Schema written to db_schema.txt');
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

inspect();
