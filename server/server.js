import mysql from "mysql2/promise";
import express from "express";
import bodyParser from "body-parser";
// const express = require('express');
// var bodyParser = require('body-parser');
const app = express();

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "users"
});

async function getUser(user) {
    const sql  = `SELECT name FROM users WHERE name = ?;`;
    const [result] = await connection.execute(sql,[user]);
    return result;
}

app.use( bodyParser.json() ); 

app.post('/api', async (req,res) => {
    await connection.connect();
    console.log("Connected");
    console.log(req.body);

    // const found = await getUser(req.body.data);

    // if (found.length > 0) {
    //     console.log(found[0]);
    //     res.status(200).send({data: found[0].name});
    // } else {
    //     res.status(404).send({data: "Nie znaleziono użytkownika"});
    // }
})


app.listen(5000, () => {
    console.log("Server started on port 5000");
})