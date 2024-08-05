const { findUser, register, getById, updateById } = require("../model/model");



async function updateUserById(data) {
    try{ 
        const user = await updateById(data);
        return user;
    }catch(err){
        return {message:err.message};
    }
}

async function getUserById(id) {
    try{ 
        const user = await getById(id);
        return user;
    }catch(err){
        return {message:err.message};
    }
}

async function login(user) {
    try{ 
        const userLogin = await findUser(user);
        return userLogin;
    }catch(err){
        return {isAuth: false, message:err.message};
    }
}

async function registerUser(user) {
    try{ 
        const ifExists = await login(user);

        if (ifExists.message != 'Nie znaleziono użytkownika') {
            return {isRegistered: false, message:`Nie można zarejestrować, użytkownik istnieje`};
        } else {
            const userRegistered = await register(user);
            return userRegistered;
        }
    }catch(err){
        return {isRegistered: false, message:err.message};
    }
}

module.exports = {
    login,
    registerUser,
    getUserById,
    updateUserById
}