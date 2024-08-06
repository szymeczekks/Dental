const {getConnection} = require('../data/data');

async function updateRole(user_id, role) {
    const connection = await getConnection();

    return new Promise( async ( resolve, reject) => {
        const sql = 'UPDATE users SET role = ? WHERE id = ?;';
        const [data] = await connection.execute(sql, [role, user_id]);
        if (data.affectedRows > 0) {
            resolve('Rola użytkownika zaktualizowana');
        } else {
            reject('Nie udało się zaktualizować roli użytkownika');
        }
    });
}

async function saveServices(services, cabinet_id) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        for (const service_object of services) {
            const { service, price = '', description = '' } = service_object;
            const service_id = 'SELECT id FROM base_services WHERE name = ?';
            const [id] = await connection.execute( service_id, [service]);
            if (id.length !== 0) {
                const sql = 'INSERT INTO services (id_cabinet, id_base_service, price, description) VALUES (?, ?, ?, ?);';
                await connection.execute( sql, [cabinet_id, id[0].id, price, description] );
            }
        };
        resolve({ message: 'Dodano usługę' });
    });
}

async function saveCabinet(req) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'INSERT INTO cabinets (user_id, name, city, street, address) VALUES (?, ?, ?, ?, ?);';
        const [data] = await connection.execute( sql, [req.id, req.name, req.city, req.street, req.address] );

        if (data.insertId) {
            resolve({message:'Dodano nowy gabinet', id: data.insertId});
            
        } else {
            reject({message:'Nie udało się dodać gabinetu'});
        }
    });
}

async function updateCabinet(dataToUpdate) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        let columnsToUpdate = '';
        const columnValues = [];
        
        Object.keys(dataToUpdate).forEach((key, index) => {
            if (key !== 'cabinetId') {
                columnsToUpdate += `${key} = ?, `;
                columnValues.push(dataToUpdate[key]);
            }
        })
        columnsToUpdate = columnsToUpdate.slice(0, -2);
        columnValues.push(dataToUpdate.id);
        
        const sql = `UPDATE cabinets SET ${columnsToUpdate} WHERE id = ?;`;
        const [data] = await connection.execute(sql, columnValues);

        if (data.affectedRows === 0) {
            reject({message:`Nie udało się zaktualizować danych`});
        } else {
            resolve({message: 'Zaktualizowano pomyślnie'});
        }
    });
}

async function getServicesByCabinetId(id) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT * FROM services WHERE id_cabinet = ?;';
        const [data] = await connection.execute(sql, [id]);

        if (data.length === 0) {
            reject({message:`Nie udało się pobrać usług gabinetu o id ${id}`});
        } else {
            let services = [];
            for (const service of data) {
                try {
                    const serviceName = await getServiceById(service.id_base_service);
                    services.push({...service, name: serviceName.name});
                } catch (err) {
                    console.log(err);
                };
            }

            resolve(services);
        }
    });
}

async function getServiceById(id) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT name FROM base_services WHERE id = ?;';
        const [data] = await connection.execute(sql,[id]);

        if (data.length === 0) {
            reject({message:`Nie odnaleziono usługi`});
        } else {
            resolve(...data);
        }
    });
}

async function getServices() {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT name FROM base_services;';
        const [data] = await connection.execute(sql);

        if (data.length === 0) {
            reject({message:`Nie udało się pobrać usług`});
        } else {
            let services = [];
            data.forEach(service => {
                services.push(service.name)
            });

            resolve(services);
        }
    });
}

async function getCabinet(id) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT * FROM cabinets WHERE user_id = ?;';
        const [data] = await connection.execute(sql, [id]);

        if (data.length === 0) {
            reject({message:`Nie znaleziono gabinetu. Wskazane id: ${id}`});
        } else {
            resolve(...data);
        }
    });
}


async function addEmployee(req) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'INSERT INTO employees (cabinet_id, name, position, email, phone, town, zip, street, building) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const [data] = await connection.execute( sql, [req.id, req.name, req.position, req.email, req.phone, req.town, req.zip, req.street, req.building] );

        if (data.insertId) {
            resolve({message:'Dodano pracownika', data: {id: data.insertId}});
            
        } else {
            reject({message:'Nie udało się dodać pracownika'});
        }
    });
}

async function addImage(image) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        if (!image) reject({massage: 'Nie odnaleziono zdjęcia'});
        if (/^image/.test(image.mimetype)) reject({message: 'Dodany plik nie jest zdjęciem'});

        console.log(__dirname);
    });

}

async function getEmployees(id) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT * FROM employees WHERE cabinet_id = ?';
        const [data] = await connection.execute( sql, [id] );
        if (data.length <= 0) return reject({message: "Nie znaleziono pracowników"});
        resolve(data);
    });
}

async function getEmployee(id) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT * FROM employees WHERE id = ? LIMIT 1';
        const [data] = await connection.execute( sql, [id] );
        if (data.length <= 0) return reject({message: "Nie znaleziono pracownika"});
        resolve(data[0]);
    });
}

async function updateEmployee(dataToUpdate) {
    const connection = await getConnection();

    return new Promise ( async (resolve, reject) => {
        let columns = [], values = [];
        for (const key in dataToUpdate) {
            if (key === 'id') continue;
            columns.push(key);
            values.push(dataToUpdate[key]);
        }
        const columnsSQL = `${columns.map((column, i) => {return `${column} = ?`})}`;
        const sql = `UPDATE employees SET ${columnsSQL} WHERE id = ?;`;
        const [data] = await connection.execute( sql, [...values, parseInt(dataToUpdate.id)]);

        if (data.affectedRows === 0) {
            reject({message:`Nie udało się zaktualizować danych`});
        } else {
            resolve({message: 'Zaktualizowano pomyślnie'});
        }
    });
}

async function deleteEmployee(id) {
    const connection = await getConnection();

    return new Promise ( async (reject, resolve) => {
        const sql = 'DELETE FROM employees WHERE id = ?';
        const [data] = await connection.execute(sql, [id]);
        if (data.affectedRows === 1) {
            resolve({message:"Usunięto pracownika"});
        } else {
            reject({message:"Nie udało się usunąć użytkownika"});
        }
    });
}

async function deleteService(id) {
    const connection = await getConnection();

    return new Promise ( async (resolve, reject) => {
        const sql = 'DELETE FROM services WHERE id = ?';
        const [data] = await connection.execute(sql, [id]);
        if (data.affectedRows === 1) {
            resolve({message:"Usunięto usługę"});
        } else {
            reject({message:"Nie udało się usunąć usługi"});
        }
    });
}

async function getService (id) {
    const connection = await getConnection();

    return new Promise ( async (resolve, reject) => {
        const sql = 'SELECT * FROM services WHERE id = ?';
        const [data] = await connection.execute(sql, [id]);
        if (data.length > 0) {
            resolve(data[0]);
        } else {
            reject({message: "Nie znaleziono usługi"});
        }
    });
}

async function updateServiceById(dataToUpdate) {
    const connection = await getConnection();

    return new Promise ( async (resolve, reject) => {
        let columns = [], values = [];
        for (const key in dataToUpdate) {
            if (key === 'id') continue;
            columns.push(key);
            values.push(dataToUpdate[key]);
        }

        const columnsSQL = `${columns.map((column, i) => {return `${column} = ?`})}`;
        const sql = `UPDATE services SET ${columnsSQL} WHERE id = ?;`;
        const [data] = await connection.execute( sql, [...values, parseInt(dataToUpdate.id)]);

        if (data.affectedRows === 0) {
            reject({message:`Nie udało się zaktualizować danych`});
        } else {
            resolve({message: 'Zaktualizowano pomyślnie'});
        }
    });
}

async function getCabinetsFull() {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const sql = `SELECT id, name, city, street, address FROM cabinets`;
        const [data] = await connection.execute(sql);

        if (data.length > 0) return resolve(data);
        return reject('Błąd pobierania gabinetów');
    });
    
}

module.exports = {
    getServices,
    saveCabinet,
    getCabinet,
    getServicesByCabinetId,
    updateCabinet,
    addEmployee,
    addImage,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    saveServices,
    updateRole,
    deleteService,
    getService,
    getServiceById,
    updateServiceById,
    getCabinetsFull
}

