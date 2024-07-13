const { Client } = require('pg');

// Database connection configuration
const datasourceConfig = {
    user: 'cdbdev',
    password: 'dbdev123',
    host: 'localhost',
    port: '5432',
    database: 'shorturldb',
};


const fetchAllShortUrls = () => {
    const client = new Client(datasourceConfig);
    client.connect();
    let sql = 'SELECT * FROM short_url_tbl';
    return new Promise((resolve, reject) => {
        client.query(sql, function (error, results, fields) {
            error ? reject(error) : resolve(results.rows);
        })
    });
}

const createShortUrl = (original, short) => {
    const insert = `INSERT INTO short_url_tbl(original_url, short_url) VALUES ('${original}', '${short}')`;
    const client = new Client(datasourceConfig);
    client.connect();
    client.query(insert, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
        } else {
            console.log('Create success.');
        }
        client.end()
    });
}
const fetchUrlByOriginal = (original) => {
    const client = new Client(datasourceConfig);
    client.connect();
    let sql = `SELECT * FROM short_url_tbl where original_url = '${original}'`;
    return new Promise((resolve, reject) => {
        client.query(sql, function (error, results, fields) {
            error ? reject(error) : resolve(results.rows);
            client.end();
        })
    });
}
const fetchUrlByShort = (short) => {
    const client = new Client(datasourceConfig);
    client.connect();
    let sql = `SELECT * FROM short_url_tbl where short_url = '${short}'`;
    return new Promise((resolve, reject) => {
        client.query(sql, function (error, results, fields) {
            error ? reject(error) : resolve(results.rows);
            client.end();
        })
    });
}

const updateShortUrlForOriginalUrl = (original, short) => {
    const client = new Client(datasourceConfig);
    client.connect();
    const update = `UPDATE short_url_tbl SET short_url = '${short}' WHERE original_url = '${original}'`;
    client.query(update, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
        } else {
            console.log('Create success.');
        }
        // Close the connection when done
        client.end()
    });
}

const deleteUrlByOriginal = (original) => {

    const client = new Client(datasourceConfig);
    client.connect();
    client.query(`DELETE FROM short_url_tbl where original_url = '${original}'`, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
        } else {
            return result.rows;
        }
        client.end();
    });
}

module.exports = { createShortUrl, fetchAllShortUrls, fetchUrlByOriginal, fetchUrlByShort, updateShortUrlForOriginalUrl, deleteUrlByOriginal };
