import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// import { ref, set } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2N9uNyg_LdSmAoe_UjOKQFHKPZS2IlXg",
  authDomain: "practice-app-b14be.firebaseapp.com",
  databaseURL: "https://practice-app-b14be-default-rtdb.firebaseio.com",
  projectId: "practice-app-b14be",
  storageBucket: "practice-app-b14be.appspot.com",
  messagingSenderId: "312763816363",
  appId: "1:312763816363:web:6fa40a82f3867241979aee",
};

const app = initializeApp(firebaseConfig); //intialapp with firebase settings
const database = getDatabase(app); //add app to getDatabase
const moviesinDB = ref(database, "shoppingList"); //this creates the movies database

console.log(app);

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

onValue(moviesinDB, function (snapshot) {
  console.log(snapshot.val());
  let shoppingListArray = Object.values(snapshot.val());

  //clearing items before it happens
  clearShoppingListEl();
  for (let i = 0; i < shoppingListArray.length; i++) {
    let currentItem = shoppingListArray[i];

    appendItemToShoppingListEl(currentItem);
  }
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  console.log(inputValue);

  push(moviesinDB, inputValue);

  clearInputFieldEl();

  console.log(`${inputValue} is added to the database`);
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
