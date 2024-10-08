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
            const { service, price = '', description = '', duration } = service_object;
            const service_id = 'SELECT id FROM base_services WHERE name = ?';
            const [id] = await connection.execute( service_id, [service]);
            if (id.length !== 0) {
                const sql = 'INSERT INTO services (id_cabinet, id_base_service, price, description, duration) VALUES (?, ?, ?, ?, ?);';
                await connection.execute( sql, [cabinet_id, id[0].id, price, description, duration] );
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

async function getCabinetByUserID(id) {
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

async function getCabinetByID(id) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT * FROM cabinets WHERE id = ?;';
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

async function getEmployeeByService(service) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const sql = 'SELECT * FROM employees WHERE employee_services LIKE ?';
        const [data] = await connection.execute( sql, [`%${service}%`] );
        if (data.length <= 0) return reject({message: "Nie znaleziono pracownika"});
        resolve(data);
    });
}

async function getBookedDays(id) {
    const connection = await getConnection();

    return new Promise( async (resolve, reject) => {
        const current_time = new Date().toLocaleString().replace(',','').replaceAll('.', '-');
        const sql = `SELECT date, booked_time FROM dates_booked WHERE employee_id = ? AND date >= '${current_time}'`;
        const [data] = await connection.execute( sql, [id] );
        data.forEach(booked => {
            booked.date = new Date(booked.date).toLocaleString('pl-PL', {timeZone: 'Europe/Warsaw'});
        });
        // if (data.length <= 0) return reject({message: "Nie znaleziono terminów"});
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

            console.log(dataToUpdate[key]);
            let value = dataToUpdate[key];
            if (key == 'employee_services' && Array.isArray(value)) {
                value = value.join();
            }

            columns.push(key);
            values.push(value);
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

async function addWorkingDay({day, is_exception, hours, status, employee_id}) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const day_column = is_exception ? 'day_exception' : 'day';
        const sql = `INSERT INTO employees_working_hours (${day_column}, hours, status, employee_id) VALUES ( ?, ?, ?, ? );`;
        const [data] = await connection.execute(sql, [day, hours, status, employee_id]);

        if (data.insertId) {
            resolve({message:'Dodano prawidłowo godziny', data: {id: data.insertId}});
        }
        return reject('Błąd podczas dodawania godzin');
    });
}

async function updateWorkingDay({employee_id, hours, status, is_exception, day}) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const day_column = is_exception ? 'day_exception' : 'day';
        const sql = `UPDATE employees_working_hours SET hours = ?, status = ? WHERE employee_id = ? AND ${day_column} = ?;`;
        const [data] = await connection.execute(sql, [hours, status, employee_id, day]);

        if (data.affectedRows !== 0) {
            resolve('Zaktualizowano pomyślnie');
        }
        return reject('Błąd podczas aktualizacji godzin');
    });
}

async function getWorkingDays(employee_id) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const sql = `SELECT day, hours, status FROM employees_working_hours WHERE employee_id = ?;`;
        const [data] = await connection.execute(sql, [employee_id]);

        if (data.length > 0) {
            resolve(data);
        }
        return reject('Błąd podczas pobierania godzin');
    });
}

async function saveReservation({ employee_id, cabinet_id, date, booked_time, service_name, user_id, name, surname }) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const sql = `INSERT INTO dates_booked (employee_id, cabinet_id, date, booked_time, service_name, user_id, name, surname) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? );`;
        const [data] = await connection.execute(sql, [employee_id, cabinet_id, date, booked_time, service_name, user_id, name, surname]);

        if (data.insertId) {
            resolve({ message: 'Dodano prawidłowo rezerwację', data: {id: data.insertId}});
        }
        return reject({ message: 'Błąd podczas dodawania rezerwacji'});
    });
}

async function getReservationsById( target, id ) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const sql = `SELECT d.user_id, d.id AS booked_id, c.id AS cabinet_id, c.name AS cabinet_name, c.city AS cabinet_city, c.street AS cabinet_street, c.address AS cabinet_address, date, booked_time, service_name, d.name AS user_name, d.surname AS user_surname, e.name AS employee_name, e.id AS employee_id, e.email AS employee_email, e.phone AS employee_phone 
        FROM dates_booked AS d 
        INNER JOIN employees AS e ON d.employee_id = e.id
        INNER JOIN cabinets AS c ON d.cabinet_id = c.id WHERE d.${target}_id = ?;`;
        const [data] = await connection.execute(sql, [id]);

        if (data.length > 0) {
            return resolve(data);
        } 
        return reject('Nie masz jeszcze żadnych wizyt :)');
    });
}

async function getAllReservations() {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const sql = `SELECT d.user_id, d.id AS booked_id, c.id AS cabinet_id, c.name AS cabinet_name, c.city AS cabinet_city, c.street AS cabinet_street, c.address AS cabinet_address, date, booked_time, service_name, d.name AS user_name, d.surname AS user_surname, e.name AS employee_name, e.id AS employee_id, e.email AS employee_email, e.phone AS employee_phone 
        FROM dates_booked AS d 
        INNER JOIN employees AS e ON d.employee_id = e.id
        INNER JOIN cabinets AS c ON d.cabinet_id = c.id`;
        const [data] = await connection.execute(sql);

        if (data.length > 0) {
            return resolve(data);
        } 
        return reject('Błąd pobierania wizyt');
    });
}

async function saveOpinion({ user_id, cabinet_id, content }) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const sql = `INSERT INTO opinions ( user_id, cabinet_id, content ) VALUES ( ?, ?, ? );`;
        const [data] = await connection.execute(sql, [ user_id, cabinet_id, content ]);
        
        if (data.insertId) {
            resolve({ message: 'Dodano prawidłowo opinię', data: {id: data.insertId}});
        }
        return reject({ message: 'Błąd podczas dodawania opinii'});
    });
}

async function selectOpinions( id ) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        const sql = `SELECT o.content, u.name, u.surname, o.id, o.status  
        FROM opinions AS o 
        INNER JOIN users AS u ON o.user_id = u.id
        WHERE o.cabinet_id = ?;`;
        
        const [data] = await connection.execute(sql, [id]);

        if (data.length > 0) {
            return resolve(data);
        } 
        return reject('Nie masz jeszcze żadnych opinii :)');
    });
}

async function updateOpinion( dataToUpdate ) {
    const connection = await getConnection();
    return new Promise ( async (resolve, reject) => {
        let columns = [], values = [];
        for (const key in dataToUpdate) {
            if (key === 'id') continue;
            columns.push(key);
            values.push(dataToUpdate[key]);
        }

        const columnsSQL = `${columns.map((column, i) => {return `${column} = ?`})}`;
        const sql = `UPDATE opinions SET ${columnsSQL} WHERE id = ?;`;
        const [data] = await connection.execute( sql, [...values, parseInt(dataToUpdate.id)]);

        if (data.affectedRows === 0) {
            reject({message:`Nie udało się zaktualizować danych`});
        } else {
            resolve({message: 'Zaktualizowano pomyślnie', isUpdated: true});
        }
    });
}

module.exports = {
    getServices,
    saveCabinet,
    getCabinetByUserID,
    getCabinetByID,
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
    getCabinetsFull,
    addWorkingDay,
    updateWorkingDay,
    getWorkingDays,
    getEmployeeByService,
    getBookedDays,
    saveReservation,
    getReservationsById,
    getAllReservations,
    saveOpinion,
    selectOpinions,
    updateOpinion
}

