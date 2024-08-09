const apiUrl = "https://jsonplaceholder.typicode.com/users";
let users = null;

getUsersData();

// function getUsersData() {
//   fetch(apiUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       users = data;
//       renderUsers();
//     });
// }

async function getUsersData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    users = data;
    console.log(users);
    renderUsers();
  } catch (error) {
    console.log(error);
  }
  console.log("Hallo");
}

function renderUsers() {
  const output = document.querySelector("#users-output");

  users.forEach(function (user) {
    const listEl = document.createElement("li");
    listEl.innerText = user.username;
    output.append(listEl);
  });
}
