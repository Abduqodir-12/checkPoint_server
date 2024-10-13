const {Pool} = require('pg');

// local bazaga ulanish
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'checkpoint',
    password: '2009',
    port: 5432
})

// Clouddagi bazaga ulanish
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL
// })

const rows = async (query, ...params) => {
    const client = await pool.connect()
    try {        
        const {rows} = await client.query(query, params)
        return rows
    } catch (error) {
        console.log(error.message);        
    } finally {
        client.release()
    }
}

module.exports.rows = rows;