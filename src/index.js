import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap'
import '@popperjs/core'
import personFacade from "./personFacade"
import utilFacade from "./utilFacade"


document.getElementById("all-content").style.display = "block"

/* Home*/
const homeTable = document.getElementById('tablehome')
const searchBar = document.getElementById('homesearch')

homesearch.addEventListener('input', () => {

  //Person by ID
  if (!isNaN(homesearch.value) && homesearch.value.length < 8)
    personFacade.getPersonById(homesearch.value, homeTable)
  //Clear after search changes
  homeTable.innerHTML = ''

  //Person by Number
  personFacade.getPersonByNumber(homesearch.value, homeTable)
  //Clear after search changes
  homeTable.innerHTML = ''

  //Persons by hobby
  personFacade.getAllPersonsByHobby(homesearch.value, homeTable)
  //Clear after search changes
  homeTable.innerHTML = ''

  //Persons by ZIP
  personFacade.getAllPersonsByZip(homesearch.value, homeTable)
  //Clear after search changes
  homeTable.innerHTML = ''

})



/* Admin */
const table = document.getElementById('tableadmin')



//Get persons and insert into table
personFacade.getAllPersons('unfiltered', table)

//Filter persons by name
const filterByName = document.getElementById('filterbyname')

filterByName.addEventListener('input', () => {
  table.innerHTML = ''
  personFacade.getAllPersons(filterByName.value, table)

  if (filterByName.value === '')
    personFacade.getAllPersons('unfiltered', table)
})

//Add Person Modal
const addModalElement = document.getElementById('addmodal')
const addModal = new bootstrap.Modal(addModalElement)
document.getElementById('closeaddmodal').addEventListener('click', () => addModal.hide())
document.getElementById('openaddmodal').addEventListener('click', () => addModal.toggle())

//Add Person
document.getElementById('saveperson').addEventListener('click', function () {
  const email = document.getElementById('addemail').value
  const firstName = document.getElementById('addfirstname').value
  const lastName = document.getElementById('addlastname').value
  const name = document.getElementById('addhobby').value
  const phoneNumber = document.getElementById('addnumber').value
  const street = document.getElementById('addstreet').value
  const zipcode = parseInt(document.getElementById('addzip').value)
  const city = document.getElementById('addcity').value

  const hobbies = [
    {
      "name": name,
    }
  ]
  const phones = [
    {
      "number": phoneNumber,
      "description": 'This is ' + firstName + ' ' + lastName + 's phone'
    }
  ]

  const cityInfo = {
    "zipcode": zipcode,
    "city": city
  }

  const address = {
    "street": street,
    "additionalInfo": firstName + ' ' + lastName + ' lives here',
    "cityInfo": cityInfo
  }
  const person = {
    "email": email,
    "firstName": firstName,
    "lastName": lastName,
    "hobbies": hobbies,
    "phones": phones,
    "address": address
  }
  addModal.toggle()
  personFacade.addPerson(person)
    .then(persons => {
      table.innerHTML = ''
      personFacade.getAllPersons('unfiltered', table)
    })
})

//Edit Person Modal
const editModalElement = document.getElementById('editmodal')
const editModal = new bootstrap.Modal(editModalElement)
document.getElementById('closeeditmodal').addEventListener('click', () => editModal.hide())
document.getElementById('openeditmodal').addEventListener('click', function () {
  editModal.toggle()

  //Add IDs to Dropdown
  personFacade.getAllArray()
    .then(function (data) {
      const all = data.all
      const idArr = all.map(p => '<option>' + p.id + '</option>')
      const idArrString = idArr.join('')
      document.getElementById('selectNumber').innerHTML = '<option disabled selected value>Select an ID</option>' + idArrString

      //Update Values
      document.getElementById('selectNumber').addEventListener('change', function () {
        const personId = document.getElementById('selectNumber').value - 1
        document.getElementById("editemail").value = all[personId].email
        document.getElementById("editfirstname").value = all[personId].firstName
        document.getElementById("editlastname").value = all[personId].lastName
        document.getElementById("edithobby").value = all[personId].hobbies[0].name
        document.getElementById("editnumber").value = all[personId].phones[0].number
        document.getElementById("editstreet").value = all[personId].address.street
        document.getElementById("editzip").value = all[personId].address.cityInfo.zipcode
        document.getElementById("editcity").value = all[personId].address.cityInfo.city
      })
    })
})

//Edit Person
document.getElementById('updateperson').addEventListener('click', function () {
  const email = document.getElementById('editemail').value
  const firstName = document.getElementById('editfirstname').value
  const lastName = document.getElementById('editlastname').value
  const name = document.getElementById('edithobby').value
  const phoneNumber = document.getElementById('editnumber').value
  const street = document.getElementById('editstreet').value
  const zipcode = parseInt(document.getElementById('editzip').value)
  const city = document.getElementById('editcity').value

  const hobbies = [
    {
      "name": name,
    }
  ]
  const phones = [
    {
      "number": phoneNumber,
      "description": 'This is ' + firstName + ' ' + lastName + 's phone'
    }
  ]

  const cityInfo = {
    "zipcode": zipcode,
    "city": city
  }

  const address = {
    "street": street,
    "additionalInfo": firstName + ' ' + lastName + ' lives here',
    "cityInfo": cityInfo
  }
  const person = {
    "email": email,
    "firstName": firstName,
    "lastName": lastName,
    "hobbies": hobbies,
    "phones": phones,
    "address": address
  }
  editModal.toggle()
  const personId = document.getElementById('selectNumber').value
  console.log(personId);
  personFacade.editPerson(person, personId)
    .then(persons => {
      table.innerHTML = ''
      personFacade.getAllPersons('unfiltered', table)
    })
})



/* Site Configuration */
function hideAllShowOne(idToShow) {
  document.getElementById("home_html").style = "display:none"
  document.getElementById("admin_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "admin": hideAllShowOne("admin_html"); break
    default: hideAllShowOne("home_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("home_html");