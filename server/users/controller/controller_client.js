const { getServices, saveCabinet, getCabinetByUserID, getCabinetByID, getServicesByCabinetId, updateCabinet, addEmployee, addImage, getEmployees, getEmployee, updateEmployee, deleteEmployee, saveServices, updateRole, deleteService, getService, getServiceById, updateServiceById, getCabinetsFull, addWorkingDay, updateWorkingDay, getWorkingDays, getEmployeeServices } = require("../model/model_client");



async function saveCabinetOne(data) {
    try{ 
        const saved = await saveCabinet(data);
        await saveServices(data.services, saved.id);
        await updateRole(data.id, 'właściciel');
        return {saved: true, message: saved.message};
    }catch(err){
        return {saved: false, message:err.message || 'Błąd zapisu gabinetu'};
    }
}

async function addServices(services, id) {
    try {
        const saved = await saveServices(services, id);
        return { saved: true, message: saved.message };
    } catch ( err ) {
        return { saved: false, message: err.message || 'Błąd zapisu usług'}

    }
}

async function getAllServices() {
    try{ 
        const services = await getServices();
        return services;
    }catch(err){
        return {message:err.message};
    }
}

async function getUsersCabinet(id) {
    try{ 
        const cabinet = await getCabinetByUserID(id);
        const cabinetServices = await getServicesByCabinetId(cabinet.id);
        return{...cabinet, services: cabinetServices};
    }catch(err){
        return {message:err.message};
    }
}

async function getCabinet(id) {
    try{ 
        const cabinet = await getCabinetByID(id);
        const cabinetServices = await getServicesByCabinetId(id);
        return{...cabinet, services: cabinetServices};
    }catch(err){
        return {message:err.message};
    }
}

async function updateCabinetById(data) {
    try{ 
        const cabinet = await updateCabinet(data);
        const updatedInfo = await getUsersCabinet(data.id);
        return{isUpdated: true, message: cabinet.message, data: updatedInfo};
    }catch(err){
        return {message: err.message};
    }
}

// async function saveCabinetOne(data) {
//     try{ 
//         const saved = await saveCabinet(data);
//         return {saved: true, message: saved.message};
//     }catch(err){
//         return {saved: false, message:err.message};
//     }
// }

async function insert_hours(hours, employee_id) {
    for (const key in hours) {
        const element = hours[key];
        try {
            await addWorkingDay({
                day: Number(key),
                is_exception: !Number.isInteger(Number(key)),
                hours: `${element.from}-${element.to}`,
                status: element.status ? 1 : 0,
                employee_id: employee_id
            });
        } catch(err) {
            console.error(err);
        }
    }
}

async function update_hours(hours, employee_id) {
    for (const key in hours) {
        const element = hours[key];
        try {
            await updateWorkingDay({
                day: Number(key),
                is_exception: !Number.isInteger(Number(key)),
                hours: `${element.from}-${element.to}`,
                status: element.status ? 1 : 0,
                employee_id: employee_id
            });
        } catch(err) {
            console.error(err);
        }
    }
}

async function saveEmployee(data) {
    try { 
        const { hours, ...rest } = data;
        const saved = await addEmployee(rest);
        await insert_hours(hours, saved.data.id);
        return {saved: true, ...saved};
    } catch(err) {
        return {saved: false, message:err.message};
    }
}

async function addFile(file) {
    try { 
        const saved = await addImage(file);
        return {saved: true, message: saved.message};
    } catch(err) {
        return {saved: false, message:err.message};
    }
}

async function getEmployeeById(id) {
    try {
        const employee = await getEmployee(id);
        let days = await getWorkingDays(id);
        for (const key in days) {
            const day = days[key];
            let { hours, ...rest } = day;
            hours = hours.split('-');
            hours = {
                from: hours[0],
                to: hours[1]
            }
            days[key] = {
                ...hours,
                ...rest
            }
        }
        employee.hours = days;
        return employee;
    } catch(err) {
        return {message: err.message};
    }
}

async function handleEmployeeServices(id) {
    try {
        const services_provided = [];
        const services_not_provided = [];
        const employee_info = await getEmployeeById(id);
        const all_services = await getServicesByCabinetId(employee_info.cabinet_id);
        const employee_services = employee_info.employee_services?.split(',').map(Number) || [];
        for (const service of all_services) {
            if (employee_services.includes(service.id_base_service)) {
                services_provided.push(service);
            } else {
                services_not_provided.push(service);
            }
        }
        return { includes: services_provided, not_includes: services_not_provided };

    } catch(err) {
        return {message: err.message};
    }
}

async function updateEmployeeById(data) {
    try {
        const { hours, ...rest } = data;
        const updated = await updateEmployee(rest);
        await update_hours(hours, data.id);
        const updatedInfo = await getEmployeeById(rest.id);
        return {isUpdated: true, message: updated.message, data: updatedInfo};
    } catch(err) {
        return {message: err.message};
    }
}

async function deleteEmployeeById(id) {
    try {
        const deleted = await deleteEmployee(id);
        return {isDeleted: true, message: deleted.message};
    } catch(err) {
        return {message: err.message};
    }
}

async function deleteServiceById(id) {
    try {
        const deleted = await deleteService(id);
        return {isDeleted: true, message: deleted.message};
    } catch(err) {
        return {message: err.message};
    }
}

async function getCabinetServices(id) {
    try {
        const services = await getServicesByCabinetId(id);
        return { data: services };
    } catch (err) {
        return { message: "Nie udało się pobrać usług" }
    }
}

async function getServicesAvailable(id) {
    try {
        const allServices = await getAllServices();
        const cabinetServices = await getServicesByCabinetId(id);
        const servicesAvailable = allServices.filter( service => cabinetServices.every( cabinet_service => cabinet_service.name != service))
        return { data: servicesAvailable }
    } catch(err) {
        return { message: "Nie udało się pobrać usług" }
    }
}

async function getServiceFullById(id) {
    try {
        const service = await getService(id);
        const name = await getServiceById(service.id_base_service);
        return { ...service, name: name.name };
    } catch(err) {
        return { message: "Nie znaleziono usługi" }
    }
}

async function updateService (data) {
    try {
        const updated = await updateServiceById (data);
        return { isUpdated: true, message: updated.message };
    } catch (err) {
        return { isUpdated: false, message: err.message }
    }
}

async function getCabinets() {
    try {
        const cabinets = await getCabinetsFull();
        return cabinets;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    getAllServices,
    saveCabinetOne,
    getUsersCabinet,
    updateCabinetById,
    getCabinet,
    saveEmployee,
    addFile,
    getEmployees,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById,
    getServicesAvailable,
    addServices,
    getCabinetServices,
    deleteServiceById,
    getServiceFullById,
    updateService,
    getCabinets,
    handleEmployeeServices
}