const URL = 'https://frederikcphb.dk/CA1Krak/api/person'

function getPersonById(id, domElement) {
    fetch(URL + '/' + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let tr = domElement.insertRow()
            tr.insertCell().textContent = data.id
            tr.insertCell().textContent = data.email
            tr.insertCell().textContent = data.firstName
            tr.insertCell().textContent = data.lastName
            tr.insertCell().textContent = data.hobbies[0].name
            tr.insertCell().textContent = data.phones[0].number
            tr.insertCell().textContent = data.address.street
            tr.insertCell().textContent = data.address.cityInfo.zipcode + ' ' + data.address.cityInfo.city
        })
}

function getPersonByNumber(number, domElement) {
    fetch(URL + '/number/' + number)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let tr = domElement.insertRow()
            tr.insertCell().textContent = data.id
            tr.insertCell().textContent = data.email
            tr.insertCell().textContent = data.firstName
            tr.insertCell().textContent = data.lastName
            tr.insertCell().textContent = data.hobbies[0].name
            tr.insertCell().textContent = data.phones[0].number
            tr.insertCell().textContent = data.address.street
            tr.insertCell().textContent = data.address.cityInfo.zipcode + ' ' + data.address.cityInfo.city
        })
}

function getAllPersons(name, domElement) {
    fetch(URL + '/all')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let all = data.all
            let arr = all.filter(n => n.firstName === name)
            if (name === 'unfiltered') arr = all
            for (let obj of arr) {
                let tr = domElement.insertRow()
                tr.insertCell().textContent = obj.id
                tr.insertCell().textContent = obj.email
                tr.insertCell().textContent = obj.firstName
                tr.insertCell().textContent = obj.lastName
                tr.insertCell().textContent = obj.hobbies[0].name
                tr.insertCell().textContent = obj.phones[0].number
                tr.insertCell().textContent = obj.address.street
                tr.insertCell().textContent = obj.address.cityInfo.zipcode + ' ' + obj.address.cityInfo.city
            }
        })
}

function getAllPersonsByHobby(hobby, domElement) {
    fetch(URL + '/hobby/' + hobby)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let all = data.all
            for (let obj of all) {
                let tr = domElement.insertRow()
                tr.insertCell().textContent = obj.id
                tr.insertCell().textContent = obj.email
                tr.insertCell().textContent = obj.firstName
                tr.insertCell().textContent = obj.lastName
                tr.insertCell().textContent = obj.hobbies[0].name
                tr.insertCell().textContent = obj.phones[0].number
                tr.insertCell().textContent = obj.address.street
                tr.insertCell().textContent = obj.address.cityInfo.zipcode + ' ' + obj.address.cityInfo.city
            }
        })
}

function getAllPersonsByZip(zip, domElement) {
    fetch(URL + '/city/' + zip)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let all = data.all
            for (let obj of all) {
                let tr = domElement.insertRow()
                tr.insertCell().textContent = obj.id
                tr.insertCell().textContent = obj.email
                tr.insertCell().textContent = obj.firstName
                tr.insertCell().textContent = obj.lastName
                tr.insertCell().textContent = obj.hobbies[0].name
                tr.insertCell().textContent = obj.phones[0].number
                tr.insertCell().textContent = obj.address.street
                tr.insertCell().textContent = obj.address.cityInfo.zipcode + ' ' + obj.address.cityInfo.city
            }
        })
}

function getAllArray() {
    return fetch(URL + '/all')
        .then(res => handleHttpErrors(res))
}


function addPerson(person) {
    const option = makeOptions("POST", person);
    return fetch(URL, option)
        .then(res => handleHttpErrors(res))
}

function editPerson(person, id) {
    const options = makeOptions('PUT', person)
    return fetch(URL + '/' + id, options)
        .then(res => handleHttpErrors(res))
}



const personFacade = {
    getPersonById,
    getPersonByNumber,
    getAllPersons,
    getAllPersonsByHobby,
    getAllPersonsByZip,
    getAllArray,
    addPerson,
    editPerson
}

function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        //Print error message on website
        //document.getElementById("errorMsg").innerHTML = "Status code: " + res.status + ", message: " + res.statusText;
        //Reset input fields
        //document.getElementById("findUserInput").value = "";

        //console.log(res);
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default personFacade;