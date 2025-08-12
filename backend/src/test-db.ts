import { Client } from 'pg';

async function testDatabaseConnection() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'directus',
        user: 'directus',
        password: 'directus',
    });

    try {
        console.log('🔌 Testing database connection...');
        await client.connect();
        console.log('✅ Successfully connected to PostgreSQL!');

        const result = await client.query('SELECT version()');
        console.log('�� PostgreSQL version:', result.rows[0].version);

        await client.end();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}

testDatabaseConnection();
