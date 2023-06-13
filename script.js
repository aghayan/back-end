
let formEl = document.getElementById('input_block');
let table = document.getElementById('table');
let userName = document.getElementById("userName");
let lastName = document.getElementById("lastName");;
let age = document.getElementById("age");
let number = 0;
let users = [];
let loading = document.getElementById('progress-bar');
let editId;
let submit = document.getElementById('go');

getUsers()
.then((data) => {
  users = data;
  showUsersInfo();
})

function getUser() {
  let nameY = userName.value;
  let lastNameY = lastName.value;
  let ageY = age.value;

  
  let id = users.length;
  if(editId || editId === 0) {
    users[editId] = {
      name: nameY, 
      lastName: lastNameY,
      age: ageY,
    } 
    editId = undefined;
  } else {
      users.push({
        name: nameY, 
        lastName: lastNameY,
        age: ageY,
        
    })} 
    if(submit.textContent === 'Save') {
      submit.textContent = 'Submit';
    }
  
    createUsersBackEnd();
    resetInput();

  simulateLoading() 
  if(!simulateLoading()){
   loading.style.display = 'block';
  }
  console.log(users);
}

function createUsersBackEnd() {
  let nameY = userName.value;
  let lastNameY = lastName.value;
  let ageY = age.value;
  
  let respUsers = {name: nameY, lastName: lastNameY, age:ageY}

  createUserResponse(respUsers);
}


function showUsersInfo() {
  table.innerHTML = `
  <thead>
      <tr>
          <th>UserId</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Age</th>
          <th colspan="2"></th>
      </tr>
  </thead>`;
  
 table.innerHTML += setUserTable(users).join("");

  let ages = users.map(user => parseInt(user.age));
  let totalAge = ages.reduce((sum, age) => sum + age, 0);
  let averageAge = totalAge / users.length;


  let averageAgeTd = document.createElement("td");
  averageAgeTd.textContent = averageAge.toFixed(2);


  let averageAgeTr = document.createElement("tr");
  averageAgeTr.innerHTML = `<td colspan="4">The arithmetic average:</td>`;
  averageAgeTr.appendChild(averageAgeTd);


  table.appendChild(averageAgeTr);

}



function setUserTable (data) {
  return data.map((elem, i) => {
      return  `
          <tr>
              <td>${i+1}</td>
              <td class="td-users">${elem.name}</td>
              <td class="td-users">${elem.lastName}</td>
              <td class="td-users">${elem.age}</td>
              <td>
                  <button  class="deleteBtn" onclick="onDeleteRow(${i})">Delete</button>
                  <button class="edit-btn" onclick="editUser(${i}, '${elem.name}', '${elem.lastName}', ${elem.age})">Edit</button> 
              </td>
          </tr>
      `;
  })
};
function sortByName() {
  users.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  showUsersInfo(users);
}

function sortByAge() {
  users.sort((a, b) => {
    return a.age - b.age;
  });
  showUsersInfo(users);
}


// function bindDeleteButtons() {
//   const deleteButtons = document.getElementsByClassName("deleteBtn");
//   for (let i = 0; i < deleteButtons.length; i++) {
//     deleteButtons[i].addEventListener("click", onDeleteRow);
//   }
 
// }

// function onDeleteRow(i) {
//   users.splice(i, 1);
//   showUsersInfo(users);
// }


function editUser (id, newName, newSurname, newAge) {
  document.getElementById("userName").value = newName;
  document.getElementById("lastName").value = newSurname;
  document.getElementById("age").value = newAge;

  submit.textContent = "Save";
  editId = id;
}


function search() {
  let search = searchInput.value.toUpperCase();

  let filterData = users.filter((val) => {
    let fullName = val.name + " " + val.lastName + " " + val.age;
    return fullName.toUpperCase().includes(search);
  });

  table.innerHTML = setUserTable(filterData).join("");
  if (search === "") {
    showUsersInfo();
  }
}

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

searchButton.onclick = function () {
  search();
};



formEl.addEventListener("submit", function(e) {
  e.preventDefault();
  resetInput();
});

function resetInput() {
  document.getElementById("userName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("age").value = "";
};

function simulateLoading() {
  let progress = 1;
  let progressBar = document.querySelector('.progress');
  let progressText = document.querySelector('.progress-text');

  let intervalId = setInterval(() => {
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    progress++;

    if (progress > 100) {
      clearInterval(intervalId);
      loading.style.display = 'none';
      
    } if(progress === 100) {
      showUsersInfo();
      resetInput();
    }
  }, 20);
}

simulateLoading();


function createUserResponse(user) {
  createUser(user).then(data => {
      if (data) {
          console.log("User data added successfully");
      }
      console.log(data);
      return getUsers();
  }).then((user) => {
      console.log(user);
  })
  console.log()
}

function onDeleteRow(i) {
  deleteUser(users[i].id)
    .then(success => {
      return getUsers();
    }).then(data => {
      users = data
      showUsersInfo();
    })};

