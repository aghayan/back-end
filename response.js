// getUsers();
// deleteUser("f4d7f914-b3e7-43e7-8f30-ab78720b92f1");

async function getUsers() {
    let req = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
    return await req.json();
}

async function createUser(user) {
    let req = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
    return await req.json();
}

async function deleteUser(id) {
    let req = await  fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    });
    return await req.json();
}



