import axios from 'axios';

export const prepareData =  (data, id) => {
    return {...data, id: id};
};

export const postRequest = (path, data, id) => {
    const dataToSend = id ? prepareData(data, id) : data;

    if (dataToSend) {
        return axios.post(path, dataToSend)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err.response;
            });
    }
};

export const validateInput = (e, setter) => {
    let error = false,
        lastIndex,
        regex;

    if (e.id === 'zip-code') {
        regex = /^\d{2}-\d+$/;
        if (e.value.length === 2 && lastIndex !== 3) {
            setter();
        };

        lastIndex = e.value.length;
    } else if (e.id === 'email') {
        regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    } else if (e.id === 'phone') {
        regex = /^\d*$/;
    }

    if (!regex.test(e.value)) {
        error = true;
    };

    if (error) {
        e.parentNode.classList.add('validate_error');
        return false;
    } else {
        e.parentNode.classList.remove('validate_error');
        return true;
    }
}