const form = document.getElementById("my-form");
const expenseInput = document.getElementById("expense");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
let editIndex = null;

//Event Listener for form
form.addEventListener("submit", function(e) {
    e.preventDefault();

    //get input values
    const expense = expenseInput.value;
    const amount = amountInput.value;
    const category = categoryInput.value;

    //check if the fields are empty
    if(expense.trim ==="" || amount.trim ==="" || category ==="Select a Category") {
        alert("please Enter all the field!");
        return;
    }

     // If editIndex is not null, update the user
     if(editIndex !== null) {
        updateUser(editIndex, {expense, amount, category});
        editIndex = null;
     }
     else {
        // Create an object to represent the user
        const user ={expense, amount, category};
        //Store the user data in local storage
        storeUser(user);
     }

     // Clear all the fields
     expenseInput.value="";
     amountInput.value="";
     categoryInput.value="Select a Category";

     clearexpenseList();
     initializeUI();
});

// Function to store the user data in local storage
function storeUser(user) {
    // Check if local storage is available
    if(typeof localStorage !== "undefined") {
        // Get existing user data from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Add the new user to the array
        users.push(user);

        // Store the updated array back in local storage
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// Function to update a user in local storage
function updateUser(index, updateUser) {
    if (typeof localStorage !== "undefined") {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users[index] = updateUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
}

// Function to clear the user list
function clearexpenseList() {
    while(expenseList.firstChild) {
        expenseList.removeChild(expenseList.firstChild);
    }
}

// Function to add a user to the UI
function addUserToUI(user, index) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>Expense: ${user.expense}</span>
      <span>Amount: ${user.amount}</span>
      <span>Category: ${user.category}</span>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    expenseList.appendChild(listItem);

    // Add a click event listener to the delete button
    const deleteButton = listItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      // Remove the user from local storage
      removeUser(index);
      // Remove the user from the UI
      listItem.remove();
    });
    
     // Add a click event listener to the edit button
    const editButton = listItem.querySelector(".edit-btn");
    editButton.addEventListener("click", function () {

    // Populate the input fields with the user's data for editing
    expenseInput.value =user.expense;
    amountInput.value =user.amount;
    categoryInput.value =user.category;
    editIndex = index;
    });
}

// Function to remove a user from local storage
function removeUser(index) {
    if (typeof localStorage !== "undefined") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

// Function to initialize the UI from local storage
function initializeUI() {
    if (typeof localStorage !== "undefined") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.forEach((user, index) => addUserToUI(user, index));
    }
  }
  
  // Initialize the UI when the page loads
  initializeUI();