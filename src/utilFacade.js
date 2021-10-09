function getTableHeader() {
    let thead = `
    <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Hobby</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
`
return thead
}

const utilFacade = {
getTableHeader
}


export default utilFacade;