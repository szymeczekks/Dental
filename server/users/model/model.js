const {getConnection} = require('../data/data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function updateById(dataToUpdate) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        let columnsToUpdate = '';
        const columnValues = [];

        Object.keys(dataToUpdate).forEach((key, index) => {
            if (key !== 'id') {
                columnsToUpdate += `${key} = ?, `;
                columnValues.push(dataToUpdate[key]);
            }
        })
        columnsToUpdate = columnsToUpdate.slice(0, -2);
        columnValues.push(dataToUpdate.id);

        console.log(columnsToUpdate);
        console.log(columnValues);

        const sql = `UPDATE users SET ${columnsToUpdate} WHERE id = ?;`;
        const [data] = await connection.execute(sql, columnValues);

        console.log(sql);
        console.log(data);

        const afterUpdate = await getById(dataToUpdate.id);
        delete afterUpdate.data.password;

        if (data.affectedRows === 0) {
            reject({message:`Nie udało się zaktualizować danych`});
        } else {
            resolve({isUpdated: true, message: 'Zaktualizowano pomyślnie', data: afterUpdate.data});
        }
    });
}

async function getById(id) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?;';
        const [data] = await connection.execute(sql, [id]);

        if (data.length === 0) {
            reject({message:`Nie znaleziono użytkownika`});
        } else {
            resolve({data: data[0]});
        }
    });
}

async function findUser(user) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE username = ?;';
        const [data] = await connection.execute(sql, [user.username]);

        if (data.length === 0) {
            reject({message:`Nie znaleziono użytkownika`});
        } else {

            try {
                if (await bcrypt.compare(user.password, data[0].password)) {
                    const id = data[0].id;
                    const token = jwt.sign({id}, "jwtSecret", {
                        expiresIn: 3000,
                    });
                    delete data[0].password;

                    resolve({isAuth: true, message:`${data[0].username}`, data: data[0], token: token, expiresAt: 3000 });
                    
                } else {
                    reject({message:`Niepoprawne hasło!`})
                }
            } catch(err){
                console.log(err);
            }
        }
    });
}

async function register(user) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const sql = 'INSERT INTO users (username, password, role, email) VALUES (?,?,?,?);';
        const [data] = await connection.execute(sql, [user.username, hashedPassword, 'user', user.email]);

        if (data.length === 0) {
            reject({message:`Rejestracja nie udana`});
        } else {
            resolve({isRegistered: true, message:`Zarejestrowano pomyślnie`, data: {...user}});
        }
    });
}

module.exports = {
    findUser,
    register,
    getById,
    updateById
}

