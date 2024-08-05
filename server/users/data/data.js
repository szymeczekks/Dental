const mysql = require("mysql2/promise");

module.exports = (function connect() {
    let connection;

    async function connect() {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "users"
        });
        await connection.connect();
        console.log("DB COnnected");
    }

    async function getConnection() {
        if (!connection) await connect();
        return connection;
    }

    return {
        getConnection
    }
})();