const express = require('express');
const multer  = require('multer');
const upload = require('./middlewares/MulterMiddleware');
const {login, registerUser, getUserById, updateUserById} = require('./controller/controller')
const { getAllServices, saveCabinetOne, getUsersCabinet, getCabinet, updateCabinetById, saveEmployee, handleEmployeeServices, addFile, getEmployees, getEmployeeById, updateEmployeeById, deleteEmployeeById, getServicesAvailable, addServices, getCabinetServices, deleteServiceById, getServiceFullById, updateService, getCabinets, getEmployeesByService, addReservation, getReservations } = require('./controller/controller_client')
const {verifyJWT} = require('./middlewares/middleware');
const { getEmployee } = require('./model/model_client');
const app = express();

app.use(express.json());

// CLIENT SERVER

app.post('/addImage', upload, function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.post('/updateCabinet', async (req,res) => {
    const update = await updateCabinetById(req.body);
    if (update.isUpdated) {
        res.status(201).send(update);
    } else {
        res.status(500).send(update.message);
    }
})

app.post('/updateEmployee', async (req,res) => {
    const update = await updateEmployeeById(req.body);
    if (update.isUpdated) {
        res.status(201).send(update);
    } else {
        res.status(500).send(update.message);
    }
})

app.post('/update-service', async (req,res) => {
    const update = await updateService(req.body);
    if (update.isUpdated) {
        res.status(201).send(update);
    } else {
        res.status(500).send(update.message);
    }
})

app.post('/saveCabinet', async (req,res) => {
    const saved = await saveCabinetOne(req.body);
    if (saved.saved) {
        res.status(201).send(saved);
    } else {
        res.status(500).send(saved);
    }
})

app.post('/addEmployee', async (req,res) => {
    const saved = await saveEmployee(req.body);
    if (saved.saved) {
        res.status(201).send(saved);
    } else {
        res.status(500).send(saved);
    }
})

app.post('/add-services', async (req,res) => {
    const { id, ...services } = req.body;
    const saved = await addServices([services], id);
    if ( saved.saved ) {
        res.status(201).send(saved)
    } else {
        res.status(500).send(saved);
    }
})

app.get('/getServices', async (req,res) => {
    const services = await getAllServices();
    res.json({services});
})

app.get('/getServicesAvailable/:cid', async (req,res) => {
    const services = await getServicesAvailable(req.params.cid);
    if (services.message) {
        res.status(500).send(services.message);
    } else {
        res.status(201).send(services);
    }
})

app.get('/get-cabinet-services/:cid', async ( req, res ) => {
    const services = await getCabinetServices(req.params.cid);
    if ( services.message ) {
        res.status(500).send(services.message);
    } else {
        res.status(201).send(services);
    }
})

app.get('/get-users-cabinet/:uid', async (req,res) => {
    const cabinet = await getUsersCabinet(req.params.uid);
    if (cabinet.message) {
        res.status(500).send(cabinet.message);
    } else {
        res.status(201).send(cabinet);
    }
})

app.get('/get-cabinet/:cid', async (req,res) => {
    const cabinet = await getCabinet(req.params.cid);
    if (cabinet.message) {
        res.status(500).send(cabinet.message);
    } else {
        res.status(201).send(cabinet);
    }
})

app.get('/get-employees/:cid', async (req,res) => {
    try {
        const employees = await getEmployees(req.params.cid);
        res.status(201).send(employees);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.get('/get-service/:sid', async (req,res) => {
    try {
        const service = await getServiceFullById(req.params.sid);
        res.status(201).send(service);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.get('/get-employee/:eid', async (req,res) => {
    try {
        const employee = await getEmployeeById(req.params.eid);
        res.status(201).send(employee);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/get-employee-services/:eid', async (req,res) => {
    try {
        const services = await handleEmployeeServices(req.params.eid);
        res.status(201).send(services);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/get-employees-by-service/:sid', async (req,res) => {
    const employees = await getEmployeesByService(req.params.sid);
    if (employees.message) {
        res.status(500).send(employees.message);
    } else {
        res.status(201).send(employees);
    }
})

app.get('/delete-employee/:eid', async (req,res) => {
    try {
        const employee = await deleteEmployeeById(req.params.eid);
        res.status(201).send(employee);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/delete-service/:sid', async (req,res) => {
    try {
        const employee = await deleteServiceById(req.params.sid);
        res.status(201).send(employee);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/get-cabinets', async (req, res) => {
    try {
        const cabinets = await getCabinets();
        res.status(201).send(cabinets);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

app.post('/send_reservation', async (req, res) => {
    const reserved = await addReservation( req.body );

    if ( reserved.data ) {
        res.status(201).send( reserved );
    } else {
        res.status(500).send( reserved );
    }
})

app.get('/get-reservations/:target/:id', async (req,res) => {
    try {
        const reservations = await getReservations( req.params.target, req.params.id );
        res.status(201).send(reservations);
    } catch (err) {
        res.status(500).send( err )
    }
})




// USER SERVER

app.get('/isUserAuth', verifyJWT, async  (req,res) => {
    const userData = await getUserById(res.locals.id);
    res.json({isAuth: true, message: 'Poprawne uwierzytelnianie', userData})
})

app.post('/register', async (req,res) => {
    const registeredUser = await registerUser(req.body);
    if (!registeredUser.isRegistered) {
        res.status(500).send(registeredUser);
    } else {
        res.status(201).send(registeredUser);
    }
    
});

app.post('/updateUser', async (req,res) => {
    const update = await updateUserById(req.body);
    if (!update.isUpdated) {
        res.status(500).send(update);
    } else {
        res.status(201).send(update);
    }
});

app.post('/login', async (req,res) => {
    const loginUser = await login(req.body);
    if (!loginUser.isAuth) {
        res.status(500).send(loginUser);
    } else {
        res.status(201).send(loginUser);
    }
});

app.listen(8080);