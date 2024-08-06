const { getServices, saveCabinet, getCabinet, getServicesByCabinetId, updateCabinet, addEmployee, addImage, getEmployees, getEmployee, updateEmployee, deleteEmployee, saveServices, updateRole, deleteService, getService, getServiceById, updateServiceById, getCabinetsFull } = require("../model/model_client");



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

async function getCabinetById(id) {
    try{ 
        const cabinet = await getCabinet(id);
        const cabinetServices = await getServicesByCabinetId(cabinet.id);
        return{...cabinet, services: cabinetServices};
    }catch(err){
        return {message:err.message};
    }
}

async function updateCabinetById(data) {
    try{ 
        const cabinet = await updateCabinet(data);
        const updatedInfo = await getCabinetById(data.id);
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

async function saveEmployee(data) {
    try { 
        const saved = await addEmployee(data);
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

async function updateEmployeeById(data) {
    try {
        const updated = await updateEmployee(data);
        const updatedInfo = await getEmployee(data.id);
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
    getCabinetById,
    updateCabinetById,
    saveEmployee,
    addFile,
    getEmployees,
    getEmployee,
    updateEmployeeById,
    deleteEmployeeById,
    getServicesAvailable,
    addServices,
    getCabinetServices,
    deleteServiceById,
    getServiceFullById,
    updateService,
    getCabinets
}